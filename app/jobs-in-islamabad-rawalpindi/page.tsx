// app/terms-and-conditions/page.tsx
import JobsInIslamabad from '@/components/JobsInIslamabad';
import LocationJobsSlider from '@/components/LocationJobsSlider';
import { fetchJobsForSlider } from '@/lib/locationJobs';

export const metadata = {
  title:
    'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Islamabad and Rawalpindi? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-islamabad-rawalpindi',
  },
  openGraph: {
    title:
      'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Islamabad & Rawalpindi across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-islamabad-rawalpindi',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Islamabad & Rawalpindi: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default async function JobsInIslamabadRawalpindiPage() {
  const [islamabadJobs, rawalpindiJobs] = await Promise.all([
    fetchJobsForSlider({
      limit: 8,
      locations: 'Islamabad',
      requiredLocationKeyword: 'islamabad',
    }),
    fetchJobsForSlider({
      limit: 8,
      locations: 'Rawalpindi',
      requiredLocationKeyword: 'rawalpindi',
    }),
  ]);

  const sliderSections = [
    {
      key: 'islamabad',
      title: 'Latest jobs in Islamabad',
      description: 'Government and private roles in the capital.',
      seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Islamabad' } },
      seeMoreLabel: 'See all Islamabad roles',
      jobs: islamabadJobs,
    },
    {
      key: 'rawalpindi',
      title: 'Latest jobs in Rawalpindi',
      description: 'Fresh listings from the Pindi region.',
      seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Rawalpindi' } },
      seeMoreLabel: 'See all Rawalpindi roles',
      jobs: rawalpindiJobs,
    },
  ].filter((section) => section.jobs.length > 0);

  return (
    <>
      <JobsInIslamabad />
      {sliderSections.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {sliderSections.map((section) => (
              <div
                key={section.key}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                  {section.description && (
                    <p className="text-sm text-gray-500">{section.description}</p>
                  )}
                </div>
                <LocationJobsSlider
                  jobs={section.jobs}
                  seeMoreHref={section.seeMoreHref}
                  seeMoreLabel={section.seeMoreLabel}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
