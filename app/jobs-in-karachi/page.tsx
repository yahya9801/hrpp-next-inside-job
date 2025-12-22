// app/terms-and-conditions/page.tsx
import JobsInKarachi from '@/components/JobsInKarachi';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title: 'Jobs in Karachi – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Karachi? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-karachi',
  },
  openGraph: {
    title: 'Jobs in Karachi – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Karachi across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-karachi',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Karachi – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Karachi: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default async function JobsInKarachiPage() {
  const karachiJobs = await fetchJobsForSlider({
    limit: 8,
    locations: 'Karachi',
    requiredLocationKeyword: 'karachi',
  });

  return (
    <>
      <JobsInKarachi />
      {karachiJobs.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">Latest jobs in Karachi</h2>
              <p className="text-sm text-gray-500">Hot roles hiring right now in Karachi.</p>
            </div>
            <LocationJobsSlider
              jobs={karachiJobs}
              seeMoreHref={{ pathname: '/classified-jobs', query: { locations: 'Karachi' } }}
              seeMoreLabel="See all Karachi roles"
            />
          </div>
        </section>
      )}
    </>
  );
}
