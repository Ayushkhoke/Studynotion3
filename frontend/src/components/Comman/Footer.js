import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="mx-auto max-w-7xl px-4">

        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-white text-xl font-semibold">
              StudyNotion
            </h2>
            <p className="mt-2 text-sm">
              Learn. Build. Grow.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-white font-medium mb-2">Company</h3>
              <ul className="space-y-1 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Resources</h3>
              <ul className="space-y-1 text-sm">
                <li>Blog</li>
                <li>Help Center</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-white font-medium mb-2">Follow Us</h3>
            <div className="flex gap-4 text-lg">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaInstagram />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 h-[1px] w-full bg-gray-700" />

        {/* BOTTOM */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
