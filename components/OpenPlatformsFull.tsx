'use client';

import React from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const OpenPlatformsFull = () => (
  <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-4 sm:p-8 my-10">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Open Platforms
      </h3>
    </div>

    {/* Description */}
    <div className="text-gray-800 text-base sm:text-lg mb-4 text-center">
      In case your job ad doesn’t follow our terms and conditions, you can post your job ad on our open platforms below:
    </div>

    {/* Social Buttons */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
      {/* <a
        href="https://www.facebook.com/groups/644836695155098"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 font-medium hover:underline text-md"
      >
        <FaFacebook className="text-3xl mr-2" />
        Click to Open Facebook Group Platform
      </a> */}

      <a
        href="https://www.linkedin.com/groups/13176545"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 font-medium hover:underline text-md"
      >
        <FaLinkedin className="text-3xl mr-2" />
        Click to Open LinkedIn Group Platform
      </a>
    </div>

    {/* Benefits */}
    <div className="text-gray-800 mb-4 text-left">
      <div className="font-semibold mb-1">Benefits of our open platforms:</div>
      <ul className="list-disc pl-6 text-base space-y-1">
        <li>Post as many jobs as you like.</li>
        <li>No restriction on Job Ads.</li>
        {/* <li>Anonymous post on Open Facebook Group platform.</li> */}
        <li>Connecting Recruiters with Job Seekers.</li>
        <li>Our reach will be your reach.</li>
      </ul>
    </div>

    <div className="mb-8">
      Please check our{" "}
      <a
        href="/terms-and-conditions"
        className="text-blue-600 underline hover:text-blue-800"
      >
        terms and conditions
      </a>{" "}
      of Open Platforms.
    </div>

    {/* JAP HRPP banner */}
    <div className="flex justify-center mt-8">
      <Image
        src='/images/open_platform.png'
        alt="JAP by HRPP"
        className="rounded-lg"
        width={500}
        height={300}
      />
    </div>
  </section>
);

export default OpenPlatformsFull;
