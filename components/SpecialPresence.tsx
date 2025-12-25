'use client';

import React from "react";
// If using a logo image, uncomment below and place image in `public/images/`
// import Image from 'next/image';
// import linkedinLogo from '/public/images/linkedin.png';

const SpecialPresence = () => (
  <section className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4 sm:p-8 my-10">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Special Presence<br className="sm:hidden" /> for your Job Ad
      </h3>
    </div>

    {/* Description */}
    <div className="text-gray-800 text-base sm:text-lg mb-5 space-y-3">
      <p>
        If your job ad follows our terms and conditions and follows LinkedIn Community guidelines, then you may get your job ad posted on our LinkedIn page at a very affordable rate.
        Whatsapp message us at:{" "}
        <a
          href="https://wa.me/923223379647"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          +92 322 337 9647
        </a>{" "}
        for further details.
      </p>

      {/* LinkedIn Info */}
      <div className="flex items-center space-x-3 mb-2">
        {/* If using image instead of "in", replace below span with Image */}
        {/* <Image src={linkedinLogo} alt="LinkedIn Logo" width={36} height={36} className="rounded" /> */}
        <span className="text-blue-700 text-3xl font-bold">in</span>
        <div>
          <a
            href="https://www.linkedin.com/company/hr-posting-partner/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-medium hover:underline"
          >
            Click to view our LinkedIn Page.
          </a>
          <div className="text-xs text-gray-600">Don't forget to follow!</div>
        </div>
      </div>

      <p>
        Please check our{" "}
        <a
          href="/terms-and-conditions"
          className="text-blue-600 underline hover:text-blue-800"
        >
          terms and conditions
        </a>{" "}
        of Job Ads.
      </p>
    </div>

    {/* LinkedIn rate info */}
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow">
      <p className="text-xl font-semibold text-gray-900">
        All job ads on LinkedIn cost PKR 500 per job ad post.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Your job ad will be its own unique post, not grouped with others, so it gets more visibility.
      </p>
    </div>
  </section>
);

export default SpecialPresence;
