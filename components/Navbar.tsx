'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const jobData = [
    { title: 'Jobs in Pakistan', link: '/jobs-in-pakistan' },
    { title: 'Jobs in Karachi', link: '/jobs-in-karachi' },
    { title: 'Jobs in Lahore', link: '/jobs-in-lahore' },
    { title: 'Jobs in Islamabad/Rawalpindi', link: '/jobs-in-islamabad-rawalpindi' },
    { title: 'Jobs in Faisalabad', link: '/jobs-in-faisalabad' },
    { title: 'Remote Jobs for Pakistan', link: '/remote-jobs-for-pakistan' },
    { title: 'Jobs/Internship for Non-experienced', link: '/jobs-internships-for-non-experienced' },
    { title: 'Linkedin Page', link: 'https://www.linkedin.com/company/hr-posting-partner/' },
    // { title: 'Open Facebook Group', link: 'https://www.facebook.com/groups/644836695155098' },
    { title: 'Open Linkedin Group', link: 'https://www.linkedin.com/groups/13176545' },

  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/hrrp_logo.png" alt="HR Posting Partner" width={40} height={40} />
          <span className="ml-2 text-lg font-semibold">HR Posting Partner</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <Link href="/about-us" className="text-gray-700 hover:text-blue-600 font-semibold">
            About Us
          </Link>

          <Link href="/classified-jobs" className="text-gray-700 hover:text-blue-600 font-semibold">
            Classified Jobs
          </Link>

          <Link href="/blogs" className="text-gray-700 hover:text-blue-600 font-semibold">
            Blogs
          </Link>

          <div className="relative inline-block">
            <button
              ref={buttonRef}
              className="text-gray-700 hover:text-blue-600 font-semibold"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onFocus={() => setIsDropdownOpen(true)}
            >
              Other Platforms
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute left-0 mt-2 space-y-2 bg-white shadow-lg p-2 rounded-md w-48 z-50"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {jobData.map((job, index) => (
                  <Link
                    key={index}
                    href={job.link}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded"
                  >
                    {job.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/advertise-with-us" className="text-gray-700 hover:text-blue-600 font-semibold">
            Advertise with Us
          </Link>
          <Link href="/contact-us" className="text-gray-700 hover:text-blue-600 font-semibold">
            Contact Us
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-2 items-center justify-center"
        >
          <div className="w-6 h-1 bg-gray-700"></div>
          <div className="w-6 h-1 bg-gray-700"></div>
          <div className="w-6 h-1 bg-gray-700"></div>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="space-y-4 p-4">
          <Link href="/about-us" className="block text-gray-700 hover:text-blue-600 font-semibold">
            About Us
          </Link>

          <Link href="/classified-jobs" className="block text-gray-700 hover:text-blue-600 font-semibold">
            Classified Jobs
          </Link>

          <Link href="/blogs" className="block text-gray-700 hover:text-blue-600 font-semibold">
            Blogs
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="block text-gray-700 hover:text-blue-600 font-semibold"
            >
              Other Platforms
            </button>

            {isDropdownOpen && (
              <div className="mt-2 space-y-2 bg-white shadow-lg p-2 rounded-md z-50">
                {jobData.map((job, index) => (
                  <Link
                    key={index}
                    href={job.link}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded"
                  >
                    {job.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/advertise-with-us" className="block text-gray-700 hover:text-blue-600 font-semibold">
            Advertise with Us
          </Link>
          <Link href="/contact-us" className="block text-gray-700 hover:text-blue-600 font-semibold">
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
