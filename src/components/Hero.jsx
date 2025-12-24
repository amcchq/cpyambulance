import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Red accent shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-600/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="badge mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
              24/7 Emergency Service
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Professional
              <span className="block text-primary-500">Ambulance Service</span>
              in Gurugram
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Swift, reliable, and compassionate emergency medical transportation.
              ICU, BLS, and Neonatal ambulance services available round the clock.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919942000266"
                className="btn-primary"
              >
                <span className="text-xl">📞</span>
                Call Emergency Now
              </a>

              <Link
                to="/book"
                className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white hover:!text-navy-900"
              >
                <span className="text-xl">🚑</span>
                Book Online
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="stat-number !text-white">15</div>
                <div className="stat-label !text-slate-400">Min Response</div>
              </div>
              <div>
                <div className="stat-number !text-white">24/7</div>
                <div className="stat-label !text-slate-400">Available</div>
              </div>
              <div>
                <div className="stat-number !text-white">50K+</div>
                <div className="stat-label !text-slate-400">Lives Saved</div>
              </div>
            </div>
          </div>

          {/* Ambulance Visual */}
          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-float">🚑</div>
                  <h3 className="text-2xl font-bold mb-2">Emergency Response</h3>
                  <p className="text-slate-300 mb-6">Our ambulances are equipped with state-of-the-art medical equipment</p>
                  <div className="flex justify-center gap-4">
                    <span className="px-4 py-2 bg-primary-600/20 rounded-full text-sm font-medium">ICU</span>
                    <span className="px-4 py-2 bg-primary-600/20 rounded-full text-sm font-medium">BLS</span>
                    <span className="px-4 py-2 bg-primary-600/20 rounded-full text-sm font-medium">Neonatal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-600 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
