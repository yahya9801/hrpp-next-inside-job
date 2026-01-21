import Banner from '@/components/Banner';
import JobCards from '@/components/JobCards';
import RecruiterSection from '@/components/RecruiterSection';
import HomePageSlider from '@/components/HomePageSlider';
import ClassifiedJobsAd from '@/components/ClassifiedJobsAd';
import AdUnit from '@/components/AdUnit';
import LocationJobsSlider, {
  type LocationSliderJob,
} from '@/components/LocationJobsSlider';
import {
  defaultLocationSliderConfigs,
  fetchJobsForSlider,
} from '@/lib/locationJobs';

export const metadata = {
  title: 'HR Posting Partner | Job Portal Pakistan',
  description:
    'HR Posting Partner helps job seekers in Pakistan find the latest jobs and recruiters hire the best talent along with advertising opportunity for businesses and companies. Post jobs free and search hundreds of listings today.',
  keywords: [
    'jobs in Pakistan',
    'HR Posting Partner',
    'job portal Pakistan',
    'latest jobs Pakistan',
    'post jobs free',
    'recruitment platform Pakistan',
  ],
  openGraph: {
    title: 'HR Posting Partner | Job Portal Pakistan',
    description:
      'Find the latest jobs in Pakistan and hire the best talent with HR Posting Partner. Post jobs free, search listings, and advertise your business today.',
    url: 'https://yourdomain.com', // replace with your domain
    siteName: 'HR Posting Partner',
    type: 'website',
  },
};

const EXPIRING_JOBS_ENDPOINT = 'https://admin.hrpostingpartner.com/api/jobs/expiring-soon';

type ExpiringJobsResponse = {
  data?: Array<{
    id?: number | string;
    title?: string;
    slug?: string;
    roles?: string[];
    experiences?: string[];
    locations?: string[];
    companies?: string[];
    posted_at?: string | null;
    expiry_date?: string | null;
  }>;
};

async function getExpiringJobs(): Promise<LocationSliderJob[]> {
  try {
    const response = await fetch(`${EXPIRING_JOBS_ENDPOINT}?limit=10`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Expiring jobs request failed with status ${response.status}`);
    }

    const json = (await response.json()) as ExpiringJobsResponse;
    const jobs = Array.isArray(json.data) ? json.data : [];
    return jobs
      .slice(0, 10)
      .filter((job) => job?.slug && job?.title)
      .map((job) => ({
        id: job?.id ?? job?.slug ?? '',
        slug: job?.slug ?? '',
        title: job?.title ?? '',
        roles: job?.roles,
        experiences: job?.experiences,
        locations: job?.locations,
        companies: job?.companies,
        postedAt: job?.posted_at ?? null,
        expiryDate: job?.expiry_date ?? null,
      }));
  } catch (error) {
    console.error('Failed to load expiring jobs slider', error);
    return [];
  }
}

const formatDate = (date) => date.toISOString().split("T")[0];

const today = new Date();
const twoDaysAgo = new Date();
twoDaysAgo.setDate(today.getDate() - 2);

const seeMoreHref = `/classified-jobs?expiry_start=${formatDate(
  twoDaysAgo
)}&expiry_end=${formatDate(today)}`;

export default async function HomePage() {
  const expiringJobs = await getExpiringJobs();
  const locationSliderSections = (
    await Promise.all(
      defaultLocationSliderConfigs.map(async (config) => {
        const fetched = await fetchJobsForSlider(config.fetchOptions);
        const maxItems = config.fetchOptions.limit ?? 5;
        const jobs = fetched.slice(0, maxItems);
        return { ...config, jobs };
      }),
    )
  ).filter((section) => section.jobs.length > 0);

  return (
    <main className="flex flex-col">
      <Banner />

      {/* Google Ad Banner */}
      {/* Google Ad Banner */}
      <AdUnit slotId="9389960073" />

      <section className="px-4 md:px-12">
        <ClassifiedJobsAd />
        <JobCards />
      </section>
      <AdUnit slotId="5491448797" />
      <RecruiterSection />
      {expiringJobs.length > 0 && (
        <section className="px-4 py-10 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl bg-white px-6 py-10 shadow-2xl sm:px-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">Jobs expiring soon</h2>
                <p className="text-sm text-gray-500">
                  Hand-picked opportunities that are closing in the next couple of days.
                </p>
              </div>
              <LocationJobsSlider
                jobs={expiringJobs}
                seeMoreHref={seeMoreHref}
                seeMoreLabel="See all Expiring roles"
              />
            </div>
          </div>
        </section>
      )}
      {locationSliderSections.length > 0 && (
        <section className="px-4 pb-10 md:px-12">
          <div className="mx-auto max-w-7xl space-y-8">
            {locationSliderSections.map((section) => (
              <div
                key={section.key}
                className="rounded-2xl bg-white px-6 py-10 shadow-2xl sm:px-10"
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
      <section>
        <HomePageSlider />
      </section>
      <AdUnit slotId="7411907265" />
    </main>
  );
}
