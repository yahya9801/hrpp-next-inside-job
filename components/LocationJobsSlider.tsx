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
  shortDescription?: string | null;
  imageUrl?: string | null;
  locationLabel?: string | null;
  postedAt?: string | null;
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
              {job.imageUrl ? (
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={job.imageUrl}
                    alt={job.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-center text-blue-700">
                  <span className="px-4 text-sm font-semibold">{job.title}</span>
                </div>
              )}

              <div className="flex h-full flex-col gap-3 p-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {job.title}
                  </h3>
                  {job.locationLabel && (
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-1" aria-hidden="true">
                        📍
                      </span>
                      {job.locationLabel}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                  {job.postedAt && (
                    <span>
                      <span className="font-semibold text-gray-700">Posted:</span>{" "}
                      {job.postedAt}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
                    View job &rarr;
                  </span>
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
