import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/AllCourse' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Results', path: '/results' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 shadow-xl py-3 backdrop-blur-md'
          : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    A
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h1 className={`text-xl font-bold ${scrolled ? 'text-emerald-800' : 'text-white'}`}>
                  ARC of <span className="text-emerald-300">Biology</span>
                </h1>
                <p className={`text-xs ${scrolled ? 'text-gray-600' : 'text-emerald-100'}`}>
                  Excellence in Medical Education
                </p>
              </div>
            </Link>
          </div>

          {/* Center-aligned navigation links */}
          <div className="hidden lg:flex items-center space-x-1 mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105
                          ${scrolled
                    ? 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
                    : 'text-white hover:text-emerald-100 hover:bg-white/20'
                  } relative group`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5
                  ${scrolled ? 'bg-emerald-600' : 'bg-white'} transition-all duration-300 group-hover:w-3/4`}></span>
              </Link>
            ))}
          </div>

          {/* Right-aligned Enroll button */}
          <div className="hidden lg:block">
            <Link to="/login">
              <button
                className={`relative glow-button px-7 py-3 rounded-full font-bold
                transition-all duration-500 hover:scale-105 shadow-lg transform
                ${scrolled
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'bg-white text-emerald-700 hover:shadow-emerald-200'
                  }`}
              >
                Login / Register
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${isOpen ? 'rotate-90 bg-emerald-100' : ''
                } ${scrolled ? 'text-emerald-700 hover:bg-emerald-50' : 'text-white hover:bg-white/20'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className={`px-4 pt-4 pb-5 space-y-3 rounded-b-xl ${scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-emerald-700/95 backdrop-blur-md'
          }`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105
                         ${scrolled
                  ? 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                  : 'text-white hover:bg-white/20'
                }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/enroll" onClick={() => setIsOpen(false)}>
            <button
              className="w-full mt-4 glow-button px-7 py-3 rounded-full text-white font-bold
               bg-gradient-to-r from-emerald-500 to-teal-600 transition-all
               duration-500 hover:from-emerald-400 hover:to-teal-500 hover:scale-105
               shadow-lg transform transition-transform"
            >
              Enroll Now
            </button>
          </Link>
        </div>
      </div>

      {/* Enhanced glow animation styles */}
      <style jsx>{`
        .glow-button {
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
          animation: glow 3s infinite ease-in-out;
        }

        @keyframes glow {
          0% {
            box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3),
                        0 0 5px rgba(20, 184, 166, 0.2);
          }
          50% {
            box-shadow: 0 4px 25px rgba(5, 150, 105, 0.5),
                        0 0 15px rgba(20, 184, 166, 0.4),
                        0 0 25px rgba(16, 185, 129, 0.3);
          }
          100% {
            box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3),
                        0 0 5px rgba(20, 184, 166, 0.2);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;