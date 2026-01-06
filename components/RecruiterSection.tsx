'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const RecruiterSection = () => {
  return (
    <div className="bg-white py-4 px-4 lg:px-16">
      {/* Section 1: For Recruiters */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-2xl rounded-2xl p-6 sm:p-10 gap-8">
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src="/images/recruiters.png"
              alt="Recruiters"
              width={400}
              height={300}
              className="rounded-lg shadow"
            />
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4 lg:pr-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">For Recruiters</h3>
            <p className="text-base sm:text-lg text-gray-700">
              We have some terms and conditions to avoid scam or fake jobs, so if you follow those T&amp;C,
              you may share your job ad/s on our official WhatsApp number:{' '}
              <a
                href="https://wa.me/923223379647"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700"
              >
                +92 322 337 9647
              </a>.
            </p>
            <Link href="/terms-and-conditions" className="inline-block text-blue-600 font-medium hover:underline transition">
              Please check our terms and conditions of Job Ads.
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: Special Presence */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-2xl rounded-2xl p-6 sm:p-10 gap-8">
          <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4 lg:pr-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
              Want Special Presence for your job ad?
            </h3>
            <p className="text-lg text-gray-700">
              If your job ad follows our terms and conditions and LinkedIn guidelines, you can get your ad
              posted on our LinkedIn page at an affordable rate. WhatsApp us at{' '}
              <a
                href="https://wa.me/923223379647"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700"
              >
                +92 322 337 9647
              </a>{' '}
              for more details.
            </p>
            <Link href="/terms-and-conditions" className="text-blue-500 hover:underline">
              Please check our terms and conditions of Job Ads.
            </Link>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src="/images/special_presence.png"
              alt="Special Presence"
              width={400}
              height={300}
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Open Platforms */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-2xl rounded-2xl p-6 sm:p-10 gap-8">
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src="/images/open_platform.png"
              alt="Open Platform"
              width={400}
              height={300}
              className="rounded-lg shadow"
            />
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4 lg:pr-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">Open Platforms</h3>
            <p className="text-gray-700 text-lg mb-3">
              If your job ad doesn't meet our T&C, post freely on our open platforms:
            </p>
            <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start mb-4">
              {/* <a
                href="https://www.facebook.com/groups/644836695155098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 font-medium hover:underline text-lg"
              >
                <FaFacebook className="text-3xl mr-2" />
                Facebook Group
              </a> */}
              <a
                href="https://www.linkedin.com/groups/13176545"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 font-medium hover:underline text-lg"
              >
                <FaLinkedin className="text-3xl mr-2" />
                LinkedIn Group
              </a>
            </div>
            <div className="text-gray-800 mb-4">
              <h3 className="font-semibold text-lg mb-2">Benefits of our open platforms:</h3>
              <ul className="list-disc pl-6 text-base space-y-1 text-left">
                <li>Post unlimited jobs</li>
                <li>No restrictions on job ads</li>
                {/* <li>Anonymous posts supported</li> */}
                <li>Connect with job seekers directly</li>
                <li>Expand your reach through our network</li>
              </ul>
            </div>
            <Link href="/terms-and-conditions" className="text-blue-600 hover:underline font-medium">
              Please check our terms and conditions of Open Platforms.
            </Link>
          </div>
        </div>
      </div>

      {/* Section 4: Advertise with Us
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-2xl rounded-2xl p-6 sm:p-10 gap-8">
          <div className="lg:w-2/3 text-center lg:text-left space-y-4">
            <h3 className="text-3xl font-bold text-blue-500">Advertise with Us!</h3>
            <p className="text-lg text-gray-700">
              Promote your business to thousands via our high-engagement social platforms. Advertise easily
              through WhatsApp Channels and Facebook. (No LinkedIn sponsored ads.)
            </p>
            <p className="text-lg text-gray-700">
              We offer various packages and time slots. Contact us on WhatsApp:{' '}
              <a
                href="https://wa.me/923223379647"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700"
              >
                +92 322 337 9647
              </a>
            </p>
            <Link href="/terms-and-conditions" className="text-blue-500 hover:underline">
              Please check our terms and conditions of Sponsored Ads.
            </Link>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src="/images/advertise_with_us.png"
              alt="Advertise"
              width={400}
              height={300}
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RecruiterSection;
