import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t-2 border-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-gradient-to-b from-background to-slate-100/50 dark:to-slate-900/50">
      {/* 🔥 IgniteX gradient accent bar */}
      <div className="h-1 w-full gradient-animated"></div>
      
      <div className="container mx-auto px-4 py-12">
        {/* 🎯 Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 🔥 IgniteX Company info */}
          <div className="space-y-4">
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-2xl gradient-ignite flex items-center justify-center text-white font-black shadow-lg pulse-glow text-2xl'>
                🔥
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  IgniteX
                </h2>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                  Where ambition sparks opportunity
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Empowering careers through innovation. Connecting talented professionals with transformative opportunities.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-teal-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-indigo-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 📌 Quick links */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-indigo-600 dark:text-indigo-400">For Job Seekers</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 transition-colors font-semibold">Browse Jobs</Link></li>
              <li><Link to="/browse" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 transition-colors font-semibold">Search</Link></li>
              <li><Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 transition-colors font-semibold">My Profile</Link></li>
              <li><Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 transition-colors font-semibold">Saved Jobs</Link></li>
            </ul>
          </div>

          {/* 🏢 For recruiters */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-purple-600 dark:text-purple-400">For Employers</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/admin/companies" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold">Post a Job</Link></li>
              <li><Link to="/admin/jobs" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold">Manage Jobs</Link></li>
              <li><Link to="/admin/companies" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold">Companies</Link></li>
              <li><Link to="/signup" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold">Sign Up</Link></li>
            </ul>
          </div>

          {/* 📧 Contact */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-teal-600 dark:text-teal-400">Get in Touch</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold">
                <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <a href="mailto:hello@ignitex.com" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  hello@ignitex.com
                </a>
              </li>
            </ul>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Have questions? We're here to help you ignite your career journey. 🔥
            </p>
          </div>
        </div>

        {/* � IgniteX Bottom bar with gradient */}
        <div className="pt-8 border-t border-gradient-to-r from-indigo-200 via-purple-200 to-teal-200 dark:from-indigo-800 dark:via-purple-800 dark:to-teal-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
              © 2025 <span className="font-black text-indigo-600 dark:text-indigo-400">IgniteX</span>. Made with <Heart className="w-4 h-4 inline text-red-500 fill-red-500 animate-pulse" /> for ambitious professionals worldwide. 🚀
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 transition-colors font-semibold">Privacy Policy</a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold">Terms of Service</a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}

export default Footer;

