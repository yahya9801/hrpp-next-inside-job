import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";
import JobImageSlider from "@/components/JobImageSlider";
import AdUnit from "@/components/AdUnit";
import SchemaMarkup from "@/components/SchemaMarkup";
import JobViewTracker from "@/components/JobViewTracker";

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">{job.job_title}</h1>
        </div>
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto sm:justify-end">
          <JobViewTracker
            jobId={jobId}
            className="text-sm text-gray-500 whitespace-nowrap"
          />
          <ShareButton title={job.job_title} />
        </div>
        <SchemaMarkup schema={schema} />
      </div>
  
    <div className="space-y-2 text-sm text-gray-600 mb-6">
      <div className="flex items-center justify-between text-gray-600">
        {/* Locations on the left */}
        <span className="m-0 inline-block">
          <strong>📍 Locations:</strong>{" "}
          {job.locations?.map((l: any) => l.name || l.text).join(", ") || "N/A"}
        </span>
  
        {/* Status Badge on the right */}
        <span
          className={`px-2 py-1 rounded-full font-medium ml-4 ${
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
      <p>
        <strong>🗓 Posted:</strong> {job.posted_at}
      </p>
      <p>
        <strong>⏳ Expires:</strong> {job.expiry_date ?? "N/A"}
      </p>
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
  </div>
  

  );
}
