import type { LocationSliderJob } from '@/components/LocationJobsSlider';

type RawSliderJob = {
  id?: number | string;
  slug?: string;
  title?: string;
  job_title?: string;
  posted_at?: string | null;
  expiry_date?: string | null;
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

export type SliderFetchOptions = {
  limit?: number;
  locations?: string;
  experience?: string;
  requiredLocationKeyword?: string;
  additionalQuery?: Record<string, string | undefined>;
};

export type SliderSectionConfig = {
  key: string;
  title: string;
  description?: string;
  fetchOptions: SliderFetchOptions;
  seeMoreHref?: string | { pathname: string; query?: Record<string, string> };
  seeMoreLabel?: string;
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
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.name || value.text || '';
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
  if (!location) return '';
  if (typeof location === 'string') return location;
  return location.name || location.text || '';
}

function jobMatchesLocationKeyword(job: RawSliderJob, keyword: string): boolean {
  if (!keyword) return true;
  if (!Array.isArray(job.locations)) return false;
  const normalizedKeyword = keyword.toLowerCase();
  return job.locations.some((loc) =>
    normalizeLocationName(loc).toLowerCase().includes(normalizedKeyword),
  );
}

export async function fetchJobsForSlider({
  limit = 5,
  locations,
  experience,
  requiredLocationKeyword,
  additionalQuery = {},
}: SliderFetchOptions = {}): Promise<LocationSliderJob[]> {
  const perPage = Math.max(limit + 3, 8);
  const params = new URLSearchParams({
    page: '1',
    per_page: String(perPage),
  });

  if (locations) {
    params.set('locations', locations);
  }

  if (experience) {
    params.set('experience', experience);
  }

  Object.entries(additionalQuery).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  try {
    const res = await fetch(`https://admin.hrpostingpartner.com/api/jobs?${params.toString()}`, {
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch jobs for slider', res.statusText);
      return [];
    }

    const data = await res.json();
    const jobs: RawSliderJob[] = Array.isArray(data?.data) ? data.data : [];

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
      title: job.title || job.job_title || 'View job',
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
    console.error('Failed to fetch jobs for slider', error);
    return [];
  }
}

export const defaultLocationSliderConfigs: SliderSectionConfig[] = [
  {
    key: 'latest-pakistan',
    title: 'Latest jobs in Pakistan',
    description: 'Fresh openings curated from every province.',
    fetchOptions: { limit: 5 },
    seeMoreHref: '/classified-jobs',
    seeMoreLabel: 'See all roles',
  },
  {
    key: 'latest-karachi',
    title: 'Latest jobs in Karachi',
    description: 'Hot roles hiring right now in Karachi.',
    fetchOptions: {
      limit: 5,
      locations: 'Karachi',
      requiredLocationKeyword: 'karachi',
    },
    seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Karachi' } },
    seeMoreLabel: 'See all Karachi roles',
  },
  {
    key: 'latest-lahore',
    title: 'Latest jobs in Lahore',
    description: "Opportunities across Lahore's top companies.",
    fetchOptions: {
      limit: 5,
      locations: 'Lahore',
      requiredLocationKeyword: 'lahore',
    },
    seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Lahore' } },
    seeMoreLabel: 'See all Lahore roles',
  },
  {
    key: 'latest-islamabad',
    title: 'Latest jobs in Islamabad',
    description: 'Government and private roles in the capital.',
    fetchOptions: {
      limit: 5,
      locations: 'Islamabad',
      requiredLocationKeyword: 'islamabad',
    },
    seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Islamabad' } },
    seeMoreLabel: 'See all Islamabad roles',
  },
  {
    key: 'latest-rawalpindi',
    title: 'Latest jobs in Rawalpindi',
    description: 'Fresh listings from the Pindi region.',
    fetchOptions: {
      limit: 5,
      locations: 'Rawalpindi',
      requiredLocationKeyword: 'rawalpindi',
    },
    seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Rawalpindi' } },
    seeMoreLabel: 'See all Rawalpindi roles',
  },
  {
    key: 'latest-faisalabad',
    title: 'Latest jobs in Faisalabad',
    description: 'Manufacturing and tech roles in Faisalabad.',
    fetchOptions: {
      limit: 5,
      locations: 'Faisalabad',
      requiredLocationKeyword: 'faisalabad',
    },
    seeMoreHref: { pathname: '/classified-jobs', query: { locations: 'Faisalabad' } },
    seeMoreLabel: 'See all Faisalabad roles',
  },
  {
    key: 'latest-remote',
    title: 'Latest Remote Jobs for Pakistan',
    description: 'Work-from-home roles curated for Pakistani talent.',
    fetchOptions: {
      limit: 5,
      locations: 'Remote',
      requiredLocationKeyword: 'remote',
    },
    seeMoreHref: '/remote-jobs-for-pakistan',
    seeMoreLabel: 'See all remote roles',
  },
  {
    key: 'latest-freshers',
    title: "Latest Fresher's Jobs/Internships",
    description: 'Entry-level openings and internships across Pakistan.',
    fetchOptions: {
      limit: 5,
      experience: 'Fresh Required',
    },
    seeMoreHref: '/jobs-internships-for-non-experienced',
    seeMoreLabel: 'See all Fresher roles',
  },
];
