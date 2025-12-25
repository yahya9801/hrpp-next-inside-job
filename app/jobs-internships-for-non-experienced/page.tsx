// app/terms-and-conditions/page.tsx
import JobsInexperieced from '@/components/JobsInexperieced';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title: 'Jobs & Internships for Non-Experienced Talent in Pakistan | HR Posting Partner',
  description:
    'Fresh graduate or entry-level in Pakistan? Find jobs and internships for non-experienced candidates across marketing, IT, admin, content, technical roles, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-for-freshers',
  },
  openGraph: {
    title: 'Jobs & Internships for Non-Experienced Talent in Pakistan | HR Posting Partner',
    description:
      'Daily updated jobs and internships for fresh graduates and entry-level candidates in Pakistan. Get instant alerts via WhatsApp.',
    url: 'https://www.hrpostingpartner.com/jobs-for-freshers',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs & Internships for Non-Experienced Talent in Pakistan',
    description:
      'Find freshers jobs and internships in Pakistan—marketing, IT, admin, content, technical and more. Get WhatsApp alerts.',
  },
};


export default async function JobsAndInternshipsFreshersPage() {
  const freshersJobs = await fetchJobsForSlider({
    limit: 8,
    experience: 'Fresh Required',
  });

  return (
    <>
      <JobsInexperieced />
      {freshersJobs.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                Latest Fresher&apos;s Jobs/Internships
              </h2>
              <p className="text-sm text-gray-500">
                Entry-level openings for fresh graduates and students.
              </p>
            </div>
            <LocationJobsSlider
              jobs={freshersJobs}
              seeMoreHref={{ pathname: '/classified-jobs', query: { experience: 'Fresh Required' } }}
              seeMoreLabel="Browse all fresher roles"
            />
          </div>
        </section>
      )}
    </>
  );
}
