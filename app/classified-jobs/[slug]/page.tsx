import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";
import JobImageSlider from "@/components/JobImageSlider";
import AdUnit from "@/components/AdUnit";
import SchemaMarkup from "@/components/SchemaMarkup";
import JobViewTracker from "@/components/JobViewTracker";
import LocationJobsSlider, {
  type LocationSliderJob,
} from "@/components/LocationJobsSlider";

export const revalidate = 60;

async function getJob(slug: string) {
  const res = await fetch(
    `https://admin.hrpostingpartner.com/api/jobs/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

type RawRelatedJob = {
  id?: number | string;
  slug?: string;
  title?: string;
  job_title?: string;
  short_description?: string | null;
  posted_at?: string | null;
  expiry_date?: string | null;
  image_path?: string | null;
  images?: Array<
    | string
    | {
        image_path?: string | null;
      }
  >;
  locations?: Array<
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
  >;
  roles?: Array<
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
  >;
  experiences?: Array<
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
  >;
  companies?: Array<
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
  >;
};

function normalizeNameOrText(
  value:
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
    | undefined
    | null,
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.name || value.text || "";
}

function normalizeLocationName(
  location:
    | string
    | {
        name?: string | null;
        text?: string | null;
      }
    | undefined
    | null,
): string {
  if (!location) return "";
  if (typeof location === "string") return location;
  return location.name || location.text || "";
}

function jobMatchesLocationKeyword(job: RawRelatedJob, keyword: string): boolean {
  if (!keyword) return true;
  if (!Array.isArray(job.locations)) return false;
  const normalizedKeyword = keyword.toLowerCase();
  return job.locations.some((loc) =>
    normalizeLocationName(loc).toLowerCase().includes(normalizedKeyword),
  );
}

type SliderFetchOptions = {
  limit?: number;
  locations?: string;
  experience?: string;
  requiredLocationKeyword?: string;
  additionalQuery?: Record<string, string | undefined>;
};

type SliderSectionConfig = {
  key: string;
  title: string;
  description?: string;
  fetchOptions: SliderFetchOptions;
  seeMoreHref?: string | { pathname: string; query?: Record<string, string> };
  seeMoreLabel?: string;
};

async function fetchJobsForSlider({
  limit = 5,
  locations,
  experience,
  requiredLocationKeyword,
  additionalQuery = {},
}: SliderFetchOptions = {}): Promise<LocationSliderJob[]> {
  const perPage = Math.max(limit + 3, 8);
  const params = new URLSearchParams({
    page: "1",
    per_page: String(perPage),
  });

  if (locations) {
    params.set("locations", locations);
  }

  if (experience) {
    params.set("experience", experience);
  }

  Object.entries(additionalQuery).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  try {
    const res = await fetch(
      `https://admin.hrpostingpartner.com/api/jobs?${params.toString()}`,
      {
        next: { revalidate: 60 * 60 * 6 },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch jobs for slider", res.statusText);
      return [];
    }

    const data = await res.json();
    const jobs: RawRelatedJob[] = Array.isArray(data?.data) ? data.data : [];

    const filtered = jobs.filter((job) => {
      if (!job.slug) return false;
      if (requiredLocationKeyword) {
        return jobMatchesLocationKeyword(job, requiredLocationKeyword);
      }
      return true;
    });

    return filtered.map((job) => ({
      id: job.id ?? job.slug!,
      slug: job.slug!,
      title: job.title || job.job_title || "View job",
      roles: Array.isArray(job.roles)
        ? job.roles.map((item) => normalizeNameOrText(item)).filter(Boolean)
        : [],
      experiences: Array.isArray(job.experiences)
        ? job.experiences.map((item) => normalizeNameOrText(item)).filter(Boolean)
        : [],
      locations: Array.isArray(job.locations)
        ? job.locations.map((loc) => normalizeLocationName(loc)).filter(Boolean)
        : [],
      companies: Array.isArray(job.companies)
        ? job.companies.map((company) => normalizeNameOrText(company)).filter(Boolean)
        : [],
      postedAt: job.posted_at ?? null,
      expiryDate: job.expiry_date ?? null,
    }));
  } catch (error) {
    console.error("Failed to fetch jobs for slider", error);
    return [];
  }
}

// ✅ generateMetadata can stay sync with the correct type
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found" };

  return {
    title: job.job_title,
    description: job.short_description ?? "",
  };
}

// ✅ Main component uses async `params` (after codemod)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  const jobId = job?.id ?? slug;
  const companyNames = Array.isArray(job?.companies)
    ? job.companies
        .map((company: any) => company?.name || company?.text)
        .filter(Boolean)
    : [];
  const sliderConfigs: SliderSectionConfig[] = [
    {
      key: "latest-pk",
      title: "Latest jobs in Pakistan",
      description: "Fresh openings curated from every province.",
      fetchOptions: { limit: 5 },
      seeMoreHref: "/classified-jobs",
      seeMoreLabel: "See all roles",
    },
    {
      key: "latest-karachi",
      title: "Latest jobs in Karachi",
      description: "Hot roles hiring right now in Karachi.",
      fetchOptions: {
        limit: 5,
        locations: "Karachi",
        requiredLocationKeyword: "karachi",
      },
      seeMoreHref: { pathname: "/classified-jobs", query: { locations: "Karachi" } },
      seeMoreLabel: "See all Karachi roles",
    },
    {
      key: "latest-lahore",
      title: "Latest jobs in Lahore",
      description: "Opportunities across Lahore’s top companies.",
      fetchOptions: {
        limit: 5,
        locations: "Lahore",
        requiredLocationKeyword: "lahore",
      },
      seeMoreHref: { pathname: "/classified-jobs", query: { locations: "Lahore" } },
      seeMoreLabel: "See all Lahore roles",
    },
    {
      key: "latest-islamabad",
      title: "Latest jobs in Islamabad",
      description: "Government and private roles in the capital.",
      fetchOptions: {
        limit: 5,
        locations: "Islamabad",
        requiredLocationKeyword: "islamabad",
      },
      seeMoreHref: { pathname: "/classified-jobs", query: { locations: "Islamabad" } },
      seeMoreLabel: "See all Islamabad roles",
    },
    {
      key: "latest-rawalpindi",
      title: "Latest jobs in Rawalpindi",
      description: "Fresh listings from the Pindi region.",
      fetchOptions: {
        limit: 5,
        locations: "Rawalpindi",
        requiredLocationKeyword: "rawalpindi",
      },
      seeMoreHref: { pathname: "/classified-jobs", query: { locations: "Rawalpindi" } },
      seeMoreLabel: "See all Rawalpindi roles",
    },
    {
      key: "latest-faisalabad",
      title: "Latest jobs in Faisalabad",
      description: "Manufacturing and tech roles in Faisalabad.",
      fetchOptions: {
        limit: 5,
        locations: "Faisalabad",
        requiredLocationKeyword: "faisalabad",
      },
      seeMoreHref: { pathname: "/classified-jobs", query: { locations: "Faisalabad" } },
      seeMoreLabel: "See all Faisalabad roles",
    },
    {
      key: "latest-remote",
      title: "Latest Remote Jobs for Pakistan",
      description: "Work-from-home and remote-friendly roles.",
      fetchOptions: {
        limit: 5,
        locations: "Remote",
        requiredLocationKeyword: "remote",
      },
      seeMoreHref:
        "https://www.hrpostingpartner.com/classified-jobs?start=&end=&locations=Remote&experience=",
      seeMoreLabel: "See all remote roles",
    },
    {
      key: "latest-freshers",
      title: "Latest Fresher's Jobs/Internships",
      description: "No-experience positions for students and grads.",
      fetchOptions: {
        limit: 5,
        experience: "Fresh Required",
      },
      seeMoreHref:
        "https://www.hrpostingpartner.com/classified-jobs?start=&end=&locations=&experience=Fresh+Required",
      seeMoreLabel: "See all Fresher roles",
    },
  ];

  const sliderSections = (
    await Promise.all(
      sliderConfigs.map(async (config) => {
        const fetched = await fetchJobsForSlider(config.fetchOptions);
        const maxItems = config.fetchOptions.limit ?? 5;
        const jobs = fetched.filter((item) => item.slug !== slug).slice(0, maxItems);
        return { ...config, jobs };
      }),
    )
  ).filter((section) => section.jobs.length > 0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.job_title,
    "description": job.short_description || job.description || "",
    "datePosted": job.posted_at,
    "validThrough": job.expiry_date ?? "",
    "employmentType": "Full-time",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Confidential Employer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HR Posting Partner",
      "sameAs": "https://www.hrpostingpartner.com",
      "logo": "https://www.hrpostingpartner.com/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.locations?.map((l: any) => l.name).join(", ") || "N/A",
        "addressCountry": "PK"
      }
    }
  };

  if (!job) notFound();

  return (
    <div className="max-w-5xl mx-auto px-2 py-10">
      <SchemaMarkup schema={schema} />
      <div className="mb-4">
        <Link
          href="/classified-jobs"
          className="inline-flex items-center gap-2 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
        >
          <span aria-hidden="true">&larr;</span>
          Click to view more jobs
        </Link>
      </div>
  
    <div className="mb-6 rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-blue-50/30 to-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.12)] space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{job.job_title}</h1>
        </div>
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto sm:justify-end">
          <JobViewTracker
            jobId={jobId}
            className="text-sm text-gray-500 whitespace-nowrap"
          />
          <ShareButton title={job.job_title} />
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center justify-between text-gray-600 gap-4 text-base md:text-lg">
          {/* Locations on the left */}
          <span className="m-0 inline-block">
            <strong>📍 Locations:</strong>{" "}
            {job.locations?.map((l: any) => l.name || l.text).join(", ") || "N/A"}
          </span>
  
          {/* Status Badge on the right */}
          <span
            className={`px-3 py-1 rounded-full font-medium ml-4 shadow-sm ${
              job.expiry_date && new Date(job.expiry_date) >= new Date()
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {job.expiry_date && new Date(job.expiry_date) >= new Date()
              ? "Active"
              : "Expired"}
          </span>
        </div>
  
        <p className="text-base md:text-lg">
          <strong>👨‍💼 Roles:</strong>{" "}
          {job.roles?.map((r: any) => r.name || r.text).join(", ") || "N/A"}
        </p>
        <p className="text-base md:text-lg">
          <strong>👨‍💼 Experiences:</strong>{" "}
          {job.experiences?.map((r: any) => r.name || r.text).join(", ") || "N/A"}
        </p>
        {companyNames.length > 0 && (
          <p className="text-base md:text-lg">
            <strong>🏢 Companies:</strong> {companyNames.join(", ")}
          </p>
        )}
        <p>
          <strong>🗓 Posted:</strong> {job.posted_at}
        </p>
        <p>
          <strong>⏳ Expires:</strong> {job.expiry_date ?? "N/A"}
        </p>
      </div>
    </div>
  
    <AdUnit slotId="6098825591" />
  
    {job.images && <JobImageSlider images={job.images} title={job.job_title} />}
  
    <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-4">
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
        Please read the entire Job Ad before applying.
      </div>
      <div
        className="prose max-w-full text-gray-800 break-words 
                 prose-img:mx-auto prose-img:w-full prose-img:rounded 
                 prose-a:underline prose-a:text-blue-600 prose-a:hover:text-blue-800"
        dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
      />
      <div>
        <p className="font-semibold text-lg text-gray-900">Disclaimer</p>
        <p className="text-sm text-gray-600 mt-2">
          HR Posting Partner is not hiring for this position, we just post job ads for other companies. We urge you to check jobs yourself as well. Spread the word "Job ke liye, HRPostingPartner.com".
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-gray-700 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
        <p className="text-base font-semibold text-gray-900">How to apply</p>
        <p className="mt-2 text-sm">
          Kindly click or right-click to copy and paste the email or link provided above.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-gray-700 shadow-[0_25px_60px_rgba(15,23,42,0.12)] break-words space-y-3">
        <p className="text-base font-semibold text-gray-900">Follow other platforms for jobs</p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Main WhatsApp Channel:</span>
            <br />
            <a
              href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K
            </a>
          </p>
          <p>
            <span className="font-medium">Continuous Individual Job Ads → HRPP 2.0 WAC:</span>
            <br />
            <a
              href="https://whatsapp.com/channel/0029VbAxrB572WTxgZBSbp1I "
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              https://whatsapp.com/channel/0029VbAxrB572WTxgZBSbp1I
            </a>
          </p>
          <p>
            <span className="font-medium">LinkedIn Page:</span>
            <br />
            <a
              href="https://www.linkedin.com/company/hr-posting-partner/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              https://www.linkedin.com/company/hr-posting-partner/
            </a>
          </p>
          <p>
            <span className="font-medium">For career and job seeking guidance:</span>
            <br />
            <a
              href="https://whatsapp.com/channel/0029VbAxrB572WTxgZBSbp1I "
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              https://www.hrpostingpartner.com/blogs
            </a>
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-gray-700 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-2">
        <p className="text-base font-semibold text-gray-900">Dear Recruiter,
Want your job ad here? (Paid)</p>
        <p>
          Contact:{" "}
          <a
            href="https://wa.me/923223379647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            +92 322 337 9647
          </a>
        </p>
        <p>
          Follow our{" "}
          <a href="/terms-and-conditions" className="text-blue-600 underline">
            terms and conditions
          </a>
          .
        </p>
        <p className="text-sm">
          Note: Do not send your resume (Job Seekers) nor call us.
        </p>
      </div>
    </div>
      {sliderSections.length > 0 && (
        <div className="mt-12 space-y-8">
          {sliderSections.map((section) => (
            <section
              key={section.key}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-sm text-gray-500">{section.description}</p>
                )}
              </div>

              <LocationJobsSlider
                jobs={section.jobs}
                seeMoreHref={section.seeMoreHref}
                seeMoreLabel={section.seeMoreLabel}
              />
            </section>
          ))}
        </div>
      )}
  </div>


  );
}
