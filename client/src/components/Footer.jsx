import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {

  const adminProfiles = [
    { name: 'Sandhya', linkedin: 'https://www.linkedin.com/in/sandhya-kumari-90b662334/' },
    { name: 'Punam', linkedin: 'https://www.linkedin.com/in/punam-kumari-prajapati-8798b433a/' },
    { name: 'Muskan', linkedin: 'https://www.linkedin.com/in/muskan-kumari-8b2468291/' },
    { name: 'Nisha', linkedin: 'https://www.linkedin.com/in/nisha-kumari-270a66345/' },
    { name: 'Kajal', linkedin: 'https://www.linkedin.com/in/kajalmanjushiv/' },
    { name: 'Ravina', linkedin: 'https://www.linkedin.com/in/rabina-kumari-92599b338/' },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#2b59b5]/95 via-[#3a75c4]/95 to-[#48d6a8]/95 backdrop-blur-sm text-white py-16 font-sans rounded-t-3xl shadow-3xl shadow-[#2b59b5]/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-x-8 border-b border-white/20 pb-12">

          {/* Text-Only Introduction (Now Left-Aligned) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-3xl font-extrabold mb-4 uppercase tracking-widest text-white">NGJUGAAD</h3>
            
            <p className="text-blue-100 text-xl mb-6">
              <span className="font-semibold text-white">NGJugaad</span> helps students borrow, lend, and exchange items efficiently to save resources and promote **sustainability** on campus.
            </p>
            
            {/* Contact Information */}
            <div className="mt-4 space-y-3">
                <p className="text-blue-100 text-xl flex items-center gap-3">
                  <Mail size={24} className="text-[#48d6a8] flex-shrink-0" /> 
                  <a href="mailto:support@ngjugaad.edu" className="hover:text-white transition">support@ngjugaad.edu</a>
                </p>
                <p className="text-blue-100 text-xl flex items-center gap-3">
                  <MapPin size={24} className="text-[#48d6a8] flex-shrink-0" /> 
                  Kishanganj, Bihar, India
                </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-4">
            <h4 className="text-2xl font-bold mb-5 uppercase tracking-wider text-[#48d6a8]">Information</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">About Us</Link></li>
              <li><Link to="/work" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">How It Works</Link></li>
              <li><Link to="/trust" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Trust & Safety</Link></li>
              <li><Link to="/community" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Community</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-2xl font-bold mb-5 uppercase tracking-wider text-[#48d6a8]">Customer Service</h4>
            <ul className="space-y-4">
              <li><Link to="/guidelines" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Community Guidelines</Link></li>
              <li><Link to="/terms" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Privacy Policy</Link></li>
              <li><Link to="/help" className="text-blue-100 hover:text-white transition-all duration-300 hover:pl-1 text-xl relative before:content-[''] before:absolute before:w-1 before:h-1 before:bg-[#48d6a8] before:rounded-full before:-left-3 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100">Help Center</Link></li>
            </ul>
          </div>

          {/* Admin Team */}
          <div>
            <h4 className="text-2xl font-bold mb-5 uppercase tracking-wider text-[#48d6a8]">Meet Our Team</h4>
            <ul className="flex flex-col gap-3 text-blue-100 text-xl">
              {adminProfiles.map((admin) => (
                <li key={admin.name}>
                  <a 
                    href={admin.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-2 group"
                  >
                    <Linkedin size={20} className="text-[#48d6a8] group-hover:text-white transition-colors" />
                    {admin.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center pt-8">
          <div className="text-xl text-blue-200 text-center">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">NGJugaad.</span> All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;