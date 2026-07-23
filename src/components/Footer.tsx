"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              About
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Welcome to my personal website! I&apos;m passionate about building
              amazing web experiences with modern technologies. Feel free to
              explore and connect with me!
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Me" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              {["GitHub", "Twitter", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110"
                  aria-label={`Connect on ${platform}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" className="opacity-50" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              &copy; {currentYear} Jordan&apos;s Personal Website. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <span>Built with</span>
              <span className="text-red-500">♥</span>
              <span>and lots of coffee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}