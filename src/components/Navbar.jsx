import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/book', label: 'Book Ambulance' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Emergency Banner */}
      <div className="emergency-banner">
        <div className="relative">
          <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse"></span>
        </div>
        <span>24/7 Emergency Hotline:</span>
        <a href="tel:+919942000266" className="font-bold hover:underline">+91-9942000266</a>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-glass' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - NOW VISIBLE ON MOBILE */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <img
                src="/favicon.svg"
                alt="CPY Ambulance"
                className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
              />
              {/* Text visible on ALL screen sizes */}
              <div>
                <span className="text-lg sm:text-xl font-bold text-navy-900">CPY</span>
                <span className="text-lg sm:text-xl font-bold text-primary-600"> Ambulance</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(link.to)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-navy-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Premium Call Now Button */}
              <a
                href="tel:+919942000266"
                className="ml-4 flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-full border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30 animate-subtle-bounce"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 rounded-xl text-navy-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
            }`}>
            <div className="space-y-2 pt-4 border-t border-slate-100">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive(link.to)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-navy-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Call Now Button - Premium */}
              <a
                href="tel:+919942000266"
                className="flex items-center justify-center gap-2 mt-4 py-4 bg-gradient-to-r from-primary-600 via-red-500 to-primary-600 bg-[length:200%_100%] text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-right transition-all duration-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Now: +91-9942000266
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
