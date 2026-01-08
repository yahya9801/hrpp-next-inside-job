// app/components/PrivacyPolicy.tsx
import React from "react";

const PrivacyPolicy = () => (
  <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-4 sm:p-8 my-8">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Privacy Policy
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
      {/* Intro */}
      <div>
        <p>
          At <span className="font-semibold">HR Posting Partner</span>{" "}
          (<a
            href="https://www.hrpostingpartner.com"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.hrpostingpartner.com
          </a>
          ), your privacy is important to us. This policy explains how we
          collect, use, and safeguard your information when you use our website,
          apply for jobs, or interact with our services.
        </p>
      </div>

      {/* 1. Information We Collect */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Personal Information:</span> name,
            email address, phone number, CV/resume, and details you submit when
            applying for a job or contacting us.
          </li>
          <li>
            <span className="font-medium">Non-Personal Information:</span>{" "}
            browser type, device info, IP address, and usage statistics.
          </li>
          <li>
            <span className="font-medium">Cookies & Similar Tech:</span> used to
            remember preferences and improve site experience.
          </li>
        </ul>
      </div>

      {/* 2. How We Use Your Information */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide and improve our job posting and marketing services.</li>
          <li>Communicate about job opportunities and respond to inquiries.</li>
          <li>Personalize content and user experience.</li>
          <li>Display relevant ads through Google AdSense and other vendors.</li>
        </ul>
      </div>

      {/* 3. Google AdSense & Cookies */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          3. Google AdSense & Cookies
        </h2>
        <p className="mb-2">
          Google, as a third-party vendor, uses cookies to serve ads on our
          site. Google’s DART cookie enables ads based on your visits to our
          site and other sites on the internet. You may opt out of personalized
          advertising via{" "}
          <a
            href="https://www.google.com/settings/ads/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>
        <p>
          We may also allow third-party ad networks to display ads. These
          parties may use cookies and similar technologies to measure ad
          effectiveness and personalize content.
        </p>
      </div>

      {/* 4. Third-Party Privacy Policies */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          4. Third-Party Privacy Policies
        </h2>
        <p>
          Our Privacy Policy does not apply to other advertisers or websites.
          Please review the privacy policies of third-party ad servers and
          services for more details on their practices.
        </p>
      </div>

      {/* 5. Data Security */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          5. Data Security
        </h2>
        <p>
          We implement appropriate technical and organizational measures to help
          protect personal information against unauthorized access, alteration,
          disclosure, or destruction. However, no method of internet
          transmission or storage is 100% secure.
        </p>
      </div>

      {/* 6. Children’s Privacy */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          6. Children’s Privacy
        </h2>
        <p>
          Our services are not directed to individuals under 13 years of age, and
          we do not knowingly collect personal data from children.
        </p>
      </div>

      {/* 7. Your Privacy Rights */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          7. Your Privacy Rights
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Request access to the personal data we hold about you.</li>
          <li>Request corrections or updates to your information.</li>
          <li>Request deletion of your data (subject to legal obligations).</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, contact us at{" "}
          <a
            href="mailto:contact@hrpostingpartner.com"
            className="text-blue-600 hover:underline"
          >
            contact@hrpostingpartner.com
          </a>
          .
        </p>
      </div>

      {/* 8. Changes to This Policy */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated “Last Updated” date.
        </p>
      </div>

      {/* 9. Contact Us */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">9. Contact Us</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            📧 Email:{" "}
            <a
              href="mailto:contact@hrpostingpartner.com"
              className="text-blue-600 hover:underline"
            >
              contact@hrpostingpartner.com
            </a>
          </li>
          <li>
            🌐 Website:{" "}
            <a
              href="https://www.hrpostingpartner.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.hrpostingpartner.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default PrivacyPolicy;
