"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import DatePickerInit from "./DatePickerInit";
import ExpiryDatePickerInit from "./ExpiryDatePickerInit";
import LocationSearchMultiSelect from "./LocationSearchMultiSelect";
import ExperienceFilter from "./ExperienceFilter";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSlugPage = /^\/classified-jobs\/[^\/]+$/.test(pathname);
  const isListingPage = pathname === "/classified-jobs";
  const showHeader = !isSlugPage;
  const showFilters = isListingPage;

  const initialQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Suspense
        fallback={
          <div className="text-center text-gray-400">Loading filters...</div>
        }
      >
        {showHeader && (
          <>
            <h1 className="text-2xl sm:text-4xl font-bold text-center text-blue-700 mb-2">
              Classified Jobs in Pakistan
            </h1>
            <p className="text-center text-gray-600 italic text-sm sm:text-base">
              “Find the latest classified jobs in Pakistan. Explore fresh, part-time, remote & full-time roles in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad and other cities of Pakistan”
            </p>

            {showFilters && (
              <div className="flex justify-center mt-6 mb-8 px-2">
                <form method="GET" className="flex w-full max-w-xl">
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="q"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search job title, keyword, or role..."
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-l-full shadow-sm text-sm text-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      🔍
                    </div>
                    {search && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none"
                        aria-label="Clear search"
                      >
                        &times;
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-r-full transition"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 lg:border-r lg:pr-6 text-sm space-y-6">
            {showFilters && (
              <>
                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden mb-4 flex justify-between items-center">
                  <h2 className="font-semibold text-base">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    {showMobileFilters ? "Hide ▲" : "Show ▼"}
                  </button>
                </div>

                {/* Animated Collapsible Filter Form */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out 
                  ${
                    showMobileFilters
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  } 
                  lg:max-h-none lg:opacity-100 lg:block`}
                >
                  <form method="GET" className="space-y-6 pt-2 lg:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-semibold">Filter Options:</h2>
                      <a
                        href="/classified-jobs"
                        className="text-xs text-red-600 underline hover:text-red-800 transition"
                      >
                        Clear All
                      </a>
                    </div>

                    {/* Date Filter */}
                    <div>
                      <p className="font-medium mb-2">Date Posted:</p>
                      <input
                        type="text"
                        id="date-range"
                        className="w-full border rounded px-2 py-1 text-sm"
                        placeholder="Select range"
                        readOnly
                      />
                      <input type="hidden" name="start" id="start-date" />
                      <input type="hidden" name="end" id="end-date" />
                    </div>

                    <div>
                      <p className="font-medium mb-2">Expiry Date:</p>
                      <input
                        type="text"
                        id="expiry-date-range"
                        className="w-full border rounded px-2 py-1 text-sm"
                        placeholder="Select range"
                        readOnly
                      />
                      <input type="hidden" name="expiry_start" id="expiry-start-date" />
                      <input type="hidden" name="expiry_end" id="expiry-end-date" />
                    </div>

                    {/* Location Filter */}
                    <LocationSearchMultiSelect />

                    {/* Experience Filter */}
                    <ExperienceFilter />

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white text-xs rounded px-3 py-2 mt-2"
                    >
                      Apply Filter
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Ad Box Always Visible */}
            <div className="border p-3 text-xs text-gray-700 rounded">
              <p>Want your job ad here?</p>
              <p className="mt-2">
                Contact:{" "}
                <a
                  href="https://wa.me/923223379647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  +92 322 337 9647
                </a>
              </p>
              <p>
                Follow our{" "}
                <a
                  href="/terms-and-conditions"
                  className=" text-blue-600 underline"
                >
                  terms and conditions
                </a>
                .
              </p>
              <p className="mt-2">Note: Do not send your resume or contact us by phone.</p>
            </div>

            <div className="mt-6 p-4  border  rounded-lg shadow-sm text-gray-700 break-words">
              <p className="font-semibold mb-2">
                Follow other platforms for jobs:
              </p>

              <p>
                <span className="font-medium">Main WhatsApp Channel:</span>
                <br />
                <a
                  href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 break-all"
                >
                  https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K
                </a>
              </p>

              <p className="mt-2">
                <span className="font-medium">Facebook Page:</span>
                <br />
                <a
                  href="https://www.facebook.com/profile.php?id=100087877179793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 break-all"
                >
                  https://www.facebook.com/profile.php?id=100087877179793
                </a>
              </p>

              <p className="mt-2">
                <span className="font-medium">LinkedIn Page:</span>
                <br />
                <a
                  href="https://www.linkedin.com/company/hr-posting-partner/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 break-all"
                >
                  https://www.linkedin.com/company/hr-posting-partner/
                </a>
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>

        {/* Litepicker only when filters shown */}
       {showFilters && (
        <>
          <DatePickerInit />
          <ExpiryDatePickerInit />
        </>
      )}

      </Suspense>
    </div>
  );
}
