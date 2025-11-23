'use client';

import Link, { type LinkProps } from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type LocationSliderJob = {
  id: number | string;
  slug: string;
  title: string;
  roles?: string[];
  experiences?: string[];
  locations?: string[];
  companies?: string[];
  postedAt?: string | null;
  expiryDate?: string | null;
};

type LocationJobsSliderProps = {
  jobs: LocationSliderJob[];
  seeMoreHref?: LinkProps["href"] | string;
  seeMoreLabel?: string;
};

export default function LocationJobsSlider({
  jobs,
  seeMoreHref,
  seeMoreLabel = "See more jobs",
}: LocationJobsSliderProps) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.05}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="!pb-10"
      >
        {jobs.map((job) => (
          <SwiperSlide key={job.id ?? job.slug}>
            <Link
              href={`/classified-jobs/${job.slug}`}
              className="group block h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-full flex-col gap-3 p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {job.title}
                </h3>

                {Array.isArray(job.roles) && job.roles.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Roles:</span>{" "}
                    {job.roles.join(", ")}
                  </p>
                )}

                {Array.isArray(job.experiences) && job.experiences.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Experiences:</span>{" "}
                    {job.experiences.join(", ")}
                  </p>
                )}

                {Array.isArray(job.locations) && job.locations.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Locations:</span>{" "}
                    {job.locations.join(", ")}
                  </p>
                )}

                {Array.isArray(job.companies) && job.companies.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Companies:</span>{" "}
                    {job.companies.join(", ")}
                  </p>
                )}

                <div className="mt-auto text-xs text-gray-500 space-y-1">
                  {job.postedAt && (
                    <p>
                      <span className="font-semibold text-gray-700">Posted:</span>{" "}
                      {job.postedAt}
                    </p>
                  )}
                  {job.expiryDate && (
                    <p>
                      <span className="font-semibold text-gray-700">Expires:</span>{" "}
                      {job.expiryDate}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {seeMoreHref && (
        <div className="mt-4 flex justify-end">
          {(() => {
            const className =
              "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100";
            const content = (
              <>
                {seeMoreLabel}
                <span aria-hidden="true">&rarr;</span>
              </>
            );
            const isExternal =
              typeof seeMoreHref === "string" &&
              /^(https?:)?\/\//i.test(seeMoreHref);

            if (isExternal) {
              return (
                <a
                  href={seeMoreHref as string}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link href={seeMoreHref} className={className}>
                {content}
              </Link>
            );
          })()}
        </div>
      )}
    </div>
  );
}
