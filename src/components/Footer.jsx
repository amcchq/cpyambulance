import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Need Emergency Help?</h3>
              <p className="text-white/80">Our team is available 24/7 to assist you</p>
            </div>
            <a
              href="tel:+919942000266"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-navy-900 hover:text-white transition-all duration-300 shadow-lg"
            >
              📞 Call +91-9942000266
            </a>
          </div>
        </div>
      </div>

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
              <p className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">📞</span>
                <span>
                  <strong className="text-white block">Emergency Hotline</strong>
                  +91-9942000266
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">📧</span>
                <span>
                  <strong className="text-white block">Email</strong>
                  cpyambulance@gmail.com
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">📍</span>
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
              Designed & Developed by <span className="text-primary-500 font-medium">Faiz</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
