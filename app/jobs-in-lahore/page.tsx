// app/terms-and-conditions/page.tsx
import JobsInLahore from '@/components/JobsInLahore';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title: 'Jobs in Lahore – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Lahore? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-lahore',
  },
  openGraph: {
    title: 'Jobs in Lahore – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Lahore across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-lahore',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Lahore – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Lahore: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default async function JobsInLahorePage() {
  const lahoreJobs = await fetchJobsForSlider({
    limit: 8,
    locations: 'Lahore',
    requiredLocationKeyword: 'lahore',
  });

  return (
    <>
      <JobsInLahore />
      {lahoreJobs.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">Latest jobs in Lahore</h2>
              <p className="text-sm text-gray-500">Opportunities across Lahore's top companies.</p>
            </div>
            <LocationJobsSlider
              jobs={lahoreJobs}
              seeMoreHref={{ pathname: '/classified-jobs', query: { locations: 'Lahore' } }}
              seeMoreLabel="See all Lahore roles"
            />
          </div>
        </section>
      )}
    </>
  );
}
