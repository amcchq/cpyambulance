const About = () => {
  const highlights = [
    {
      title: '24/7 Emergency Response',
      description: 'Round-the-clock availability ensures immediate assistance whenever you need it.',
      icon: '🕒'
    },
    {
      title: 'Professional Medical Staff',
      description: 'Highly trained EMTs, paramedics, and medical professionals with years of experience.',
      icon: '👨‍⚕️'
    },
    {
      title: 'Advanced Equipment',
      description: 'State-of-the-art medical equipment and ICU facilities for critical care transport.',
      icon: '🏥'
    },
    {
      title: 'GPS Tracking',
      description: 'Real-time GPS tracking allows you to monitor your ambulance\'s location.',
      icon: '📍'
    },
    {
      title: 'Insurance Support',
      description: 'Assistance with insurance claims and documentation for covered services.',
      icon: '📋'
    },
    {
      title: 'Quality Assurance',
      description: 'Regular maintenance and sanitization of all ambulances and equipment.',
      icon: '✅'
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
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="card p-6 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="icon-box mb-4">
                  <span className="text-2xl">{highlight.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            ))}
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
                📞 Call +91-9942000266
              </a>
              <a href="/contact" className="btn-secondary">
                📧 Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
