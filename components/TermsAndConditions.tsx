// app/components/TermsAndConditions.tsx
import React from 'react';

const TermsAndConditions = () => (
  <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-4 sm:p-8 my-8">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Terms and Conditions
      </h3>
    </div>
     {/* Dates */}
     <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 text-xs text-gray-500 mb-6">
      <p>
        <span className="font-semibold text-gray-700">Effective Date:</span>{" "}
        August 29, 2025
      </p>
      <p>
        <span className="font-semibold text-gray-700">Last Updated:</span>{" "}
        August 29, 2025
      </p>
    </div>

    {/* Main Content */}
    <div className="text-sm sm:text-base text-gray-800 space-y-6">
      
      {/* Job Ads on Main Platforms */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Job Ads on our Main Platforms:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>All job ads must clearly mention the job location — whether it is remote, on-site, or simply listed as "Pakistan."</li>
          <li>Job advertisements must include written content. Image-only job posts will not be accepted.</li>
          <li>Ads that provide only a WhatsApp number for candidate communication are not allowed.</li>
          <li>Every job post must include either an official company email address (not personal emails like @gmail.com, @ymail.com, etc.) or a valid link to the job application or company website.</li>
          <li>Google Form links are not permitted in job listings.</li>
          <li>Personal/Unofficial email domains such as @gmail.com, @hotmail.com, or @ymail.com are not considered official and are not allowed.</li>
          <li>Walk-in interview job ads may include a WhatsApp number but must not use personal/unofficial email addresses.</li>
          <li>Walk-in interview postings must clearly state the interview location, date, and time. Incomplete ads will not be approved.</li>
          <li>Company names in each job ads are preferred</li>
        </ul>
      </div>

      {/* Sponsored Ads */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Sponsored Ads:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure your business is legal and authentic.</li>
          <li>Scamming the audience will result in immediate deletion and possible reporting.</li>
          <li>Any illegal business discovered later will be treated similarly.</li>
          <li>Team HRPP does initial scrutiny, but users are advised to remain cautious.</li>
        </ul>
      </div>

      {/* Open Platforms */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Open Platforms:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Only job ads are allowed — no unrelated content.</li>
          <li>Bullying or foul language will lead to a ban.</li>
          <li>For sponsored ads, contact us via our official WhatsApp number.</li>
          <li>Group activity will be monitored by Team HRPP.</li>
          <li>We are not responsible for scams on open platforms — proceed with caution.</li>
        </ul>
      </div>

    </div>
  </section>
);

export default TermsAndConditions;
