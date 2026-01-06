// app/terms-and-conditions/page.tsx
import JobsInPakistan from '@/components/JobsInPakistan';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title: 'Jobs in Pakistan – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'HR Posting Partner updates daily jobs in Pakistan across government and private sectors, including remote, part-time, full-time, and freelance roles. Explore opportunities in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and other major cities.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-pakistan',
  },
  openGraph: {
    title: 'Jobs in Pakistan – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated government and private jobs in Pakistan, including remote and part-time roles. Discover opportunities in Karachi, Lahore, Islamabad, Rawalpindi, and Faisalabad.',
    url: 'https://www.hrpostingpartner.com/jobs-in-pakistan',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Pakistan – Latest Government & Private Vacancies',
    description:
      'Daily updated jobs in Pakistan: government, private, remote, part-time, and full-time roles across major cities.',
  },
};

export default async function JobsInPakistanPage() {
  const pakistanJobs = await fetchJobsForSlider({ limit: 8 });

  return (
    <>
      <JobsInPakistan />
      {pakistanJobs.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">Latest Jobs in Pakistan</h2>
              <p className="text-sm text-gray-500">Fresh openings curated from every province.</p>
            </div>
            <LocationJobsSlider
              jobs={pakistanJobs}
              seeMoreHref="/classified-jobs"
              seeMoreLabel="See all roles"
            />
          </div>
        </section>
      )}
    </>
  );
}
