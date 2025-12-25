import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/favicon.svg" alt="CPY Ambulance" className="w-12 h-12" />
              <div>
                <span className="text-xl font-bold">CPY</span>
                <span className="text-xl font-bold text-primary-500"> Ambulance</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Providing professional emergency medical services 24/7 in Gurugram, Haryana.
              Your trusted partner for ambulance services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/book', label: 'Book Ambulance' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-primary-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-primary-500">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-primary-500">→</span>
                Emergency Ambulance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">→</span>
                ICU Ambulance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">→</span>
                BLS Ambulance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">→</span>
                Neonatal Ambulance
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4 text-slate-400">
              <a href="tel:+919942000266" className="flex items-start gap-3 hover:text-white transition-colors group">
                <svg className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>
                  <strong className="text-white block group-hover:text-primary-400 transition-colors">Emergency Hotline</strong>
                  +91-9942000266
                </span>
              </a>
              <a href="mailto:cpyambulance@gmail.com" className="flex items-start gap-3 hover:text-white transition-colors group">
                <svg className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>
                  <strong className="text-white block group-hover:text-primary-400 transition-colors">Email</strong>
                  cpyambulance@gmail.com
                </span>
              </a>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>
                  <strong className="text-white block">Location</strong>
                  Gurugram, Haryana, India
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
            <p>&copy; {currentYear} CPY Ambulance. All rights reserved.</p>
            <p>
              Designed & Developed by{' '}
              <a
                href="https://www.instagram.com/faizdecoded/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:text-primary-400 hover:underline transition-colors"
              >
                Faiz
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
