// app/terms-and-conditions/page.tsx
import JobsRemote from '@/components/JobsRemote';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities | HR Posting Partner',
  description:
    'Looking for remote jobs in Pakistan? HR Posting Partner curates the latest work-from-home roles in IT, design, software engineering, content, admin support, and more for Pakistan-based applicants.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/remote-jobs',
  },
  openGraph: {
    title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities | HR Posting Partner',
    description:
      'Discover daily updated remote and work-from-home jobs tailored for Pakistan. Filter by category, experience, and posting date.',
    url: 'https://www.hrpostingpartner.com/remote-jobs',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities',
    description:
      'Daily updated remote jobs for Pakistan: full-time, part-time, freelance, and contract roles across top industries.',
  },
};

export default async function RemoteJobsPage() {
  const remoteJobs = await fetchJobsForSlider({
    limit: 8,
    locations: 'Remote',
    requiredLocationKeyword: 'remote',
  });

  return (
    <>
      <JobsRemote />
      {remoteJobs.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                Latest Remote Jobs for Pakistan
              </h2>
              <p className="text-sm text-gray-500">
                Curated work-from-home roles hiring remote talent right now.
              </p>
            </div>
            <LocationJobsSlider
              jobs={remoteJobs}
              seeMoreHref={{ pathname: '/classified-jobs', query: { locations: 'Remote' } }}
              seeMoreLabel="Browse all remote jobs"
            />
          </div>
        </section>
      )}
    </>
  );
}
