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
};

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

function ensureAbsoluteImageUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }
  return `https://admin.hrpostingpartner.com/storage/${path.replace(/^\/+/, "")}`;
}

function resolveJobImageUrl(job: RawRelatedJob): string | null {
  if (typeof job.image_path === "string" && job.image_path.trim().length > 0) {
    return ensureAbsoluteImageUrl(job.image_path.trim());
  }

  if (Array.isArray(job.images) && job.images.length > 0) {
    const first = job.images[0];
    if (typeof first === "string" && first.trim().length > 0) {
      return first.trim();
    }
    if (
      first &&
      typeof first === "object" &&
      typeof first.image_path === "string" &&
      first.image_path.trim().length > 0
    ) {
      return ensureAbsoluteImageUrl(first.image_path.trim());
    }
  }

  return null;
}

function getPrimaryLocation(job: RawRelatedJob): string | null {
  if (!Array.isArray(job.locations) || job.locations.length === 0) {
    return null;
  }

  const firstWithValue = job.locations.find(
    (loc) => normalizeLocationName(loc).trim().length > 0,
  );
  const label = normalizeLocationName(firstWithValue);
  return label ? label : null;
}

function isKarachiJob(job: RawRelatedJob): boolean {
  if (!Array.isArray(job.locations)) return false;
  return job.locations.some((loc) =>
    normalizeLocationName(loc).toLowerCase().includes("karachi"),
  );
}

async function getKarachiJobs(limit = 5): Promise<LocationSliderJob[]> {
  const params = new URLSearchParams({
    locations: "Karachi",
    page: "1",
    per_page: String(Math.max(limit, 5)),
  });

  try {
    const res = await fetch(
      `https://admin.hrpostingpartner.com/api/jobs?${params.toString()}`,
      {
        next: { revalidate: 120 },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch Karachi jobs", res.statusText);
      return [];
    }

    const data = await res.json();
    const jobs: RawRelatedJob[] = Array.isArray(data?.data) ? data.data : [];

    return jobs
      .filter((job) => Boolean(job.slug) && isKarachiJob(job))
      .slice(0, limit)
      .map((job) => ({
        id: job.id ?? job.slug!,
        slug: job.slug!,
        title: job.title || job.job_title || "View job",
        shortDescription: job.short_description ?? "",
        imageUrl: resolveJobImageUrl(job),
        locationLabel: getPrimaryLocation(job),
        postedAt: job.posted_at ?? null,
      }));
  } catch (error) {
    console.error("Failed to fetch Karachi jobs", error);
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
  const rawKarachiJobs = await getKarachiJobs(6);
  const karachiJobs = rawKarachiJobs
    .filter((related) => related.slug !== slug)
    .slice(0, 5);

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
    <div className="max-w-4xl mx-auto px-4 py-10">
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
        <div className="flex items-center justify-between text-gray-600 gap-4">
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
  
        <p>
          <strong>👨‍💼 Roles:</strong>{" "}
          {job.roles?.map((r: any) => r.name || r.text).join(", ") || "N/A"}
        </p>
        <p>
          <strong>👨‍💼 Experiences:</strong>{" "}
          {job.experiences?.map((r: any) => r.name || r.text).join(", ") || "N/A"}
        </p>
        {companyNames.length > 0 && (
          <p>
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
  
    <div
      className="prose max-w-full text-gray-800 break-words 
               prose-img:mx-auto prose-img:w-full prose-img:rounded 
               prose-a:underline prose-a:text-blue-600 prose-a:hover:text-blue-800"
      dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
    />

      {/* Disclaimer Section */}
      <div className="mt-6">
      <p className="font-semibold">Disclaimer:</p>
      <p>
        HR Posting Partner is not hiring for this position, we just post job ads for other companies. We urge you to check jobs yourself as well. Spread the word "Job ke liye, HRPostingPartner.com".
      </p>
    </div>
  
    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700">
      <p className="mt-2">
        <strong>How to apply:</strong> Kindly click or right-click to copy and
        paste the email or link provided above.
      </p>
    </div>
    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700 break-words">
      <p className="font-semibold mb-2">Follow other platforms for jobs:</p>
  
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
  
      <p className="mt-2">
        <span className="font-medium">Continuous Individual Job Ads  → HRPP 2.0 WAC:</span>
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
  
      <p className="mt-2">
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
    </div>
  
    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700">
      <p>Want your job ad here?</p>
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
      <p className="mt-2">
        Note: Do not send your resume or contact us by phone.
      </p>
    </div>
      {karachiJobs.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                More jobs in Karachi
              </h2>
              <p className="text-sm text-gray-500">
                Discover fresh openings similar to this role.
              </p>
            </div>
          </div>

          <LocationJobsSlider
            jobs={karachiJobs}
            seeMoreHref={{ pathname: "/classified-jobs", query: { locations: "Karachi" } }}
            seeMoreLabel="See more Karachi jobs"
          />
        </section>
      )}
  </div>


  );
}
