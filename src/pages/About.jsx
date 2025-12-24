const About = () => {
  const highlights = [
    {
      title: '24/7 Emergency Response',
      description: 'Round-the-clock availability ensures immediate assistance whenever you need it.',
      iconType: 'clock'
    },
    {
      title: 'Expert Medical Staff',
      description: 'Highly trained EMTs, paramedics, and medical professionals with years of experience.',
      iconType: 'doctor'
    },
    {
      title: 'Advanced Equipment',
      description: 'State-of-the-art medical equipment and ICU facilities for critical care transport.',
      iconType: 'hospital'
    },
    {
      title: 'GPS Tracking',
      description: 'Real-time GPS tracking allows you to monitor your ambulance\'s location.',
      iconType: 'location'
    },
    {
      title: 'Insurance Support',
      description: 'Assistance with insurance claims and documentation for covered services.',
      iconType: 'document'
    },
    {
      title: 'Quality Assurance',
      description: 'Regular maintenance and sanitization of all ambulances and equipment.',
      iconType: 'check'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Header */}
      <div className="bg-navy-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge !bg-primary-600 !text-white mb-4 mx-auto">About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About CPY Ambulance
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Committed to providing exceptional emergency medical transportation services
            with compassion, professionalism, and cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 text-center">
            <div className="badge mb-6 mx-auto">Our Mission</div>
            <p className="text-lg text-navy-700 leading-relaxed">
              At CPY Ambulance, our mission is to save lives by providing rapid, reliable, and compassionate
              emergency medical transportation services. We are dedicated to bridging the gap between medical
              emergencies and professional healthcare, ensuring that every patient receives the care they need
              when they need it most. With a commitment to excellence, safety, and community service, we strive
              to be the trusted partner for emergency medical services in Gurugram and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Our Strengths</div>
            <h2 className="section-title mb-4">Why Choose CPY Ambulance?</h2>
            <p className="section-subtitle mx-auto">
              We bring together expertise, technology, and compassion to deliver the best emergency care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const icons = {
                clock: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />,
                doctor: <path d="M12 2C8.13 2 5 5.13 5 9c0 3.17 2.11 5.85 5 6.71V22h4v-6.29c2.89-.86 5-3.54 5-6.71 0-3.87-3.13-7-7-7zm-1.5 5c.83 0 1.5.67 1.5 1.5S11.33 10 10.5 10 9 9.33 9 8.5 9.67 7 10.5 7zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />,
                hospital: <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />,
                location: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />,
                document: <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />,
                check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              };
              return (
                <div
                  key={highlight.title}
                  className="card p-6 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                    <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      {icons[highlight.iconType]}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Numbers that speak for our commitment to saving lives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="stat-number !text-primary-500">50K+</div>
              <div className="stat-label !text-slate-300">Lives Saved</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="stat-number !text-primary-500">24/7</div>
              <div className="stat-label !text-slate-300">Service Availability</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="stat-number !text-primary-500">15min</div>
              <div className="stat-label !text-slate-300">Average Response</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="stat-number !text-primary-500">100%</div>
              <div className="stat-label !text-slate-300">Professional Staff</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-8 md:p-12">
            <h2 className="section-title mb-4">Ready to Experience Our Service?</h2>
            <p className="section-subtitle mx-auto mb-8">
              Contact us today for emergency services or to learn more about our comprehensive ambulance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919942000266" className="btn-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call +91-9942000266
              </a>
              <a href="/contact" className="btn-secondary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
