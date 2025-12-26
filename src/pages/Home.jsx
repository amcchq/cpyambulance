import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      title: 'Emergency Ambulance',
      description: '24/7 emergency response with rapid deployment and professional medical care.',
      iconType: 'ambulance',
      features: [
        'Immediate response within 15 minutes',
        'Trained emergency medical technicians',
        'Advanced life support equipment',
        'Real-time GPS tracking'
      ]
    },
    {
      title: 'ICU Ambulance',
      description: 'Critical care transportation with ventilators and monitoring equipment.',
      iconType: 'hospital',
      features: [
        'Intensive care unit facilities',
        'Ventilator and oxygen support',
        'Cardiac monitoring equipment',
        'Specialized medical staff'
      ]
    },
    {
      title: 'BLS Ambulance',
      description: 'Basic life support services for non-critical medical transportation.',
      iconType: 'van',
      features: [
        'Basic life support equipment',
        'Patient monitoring',
        'Safe transportation',
        'Affordable rates'
      ]
    },
    {
      title: 'Neonatal Ambulance',
      description: 'Specialized care for newborn infants and premature babies.',
      iconType: 'baby',
      features: [
        'Incubator and warming equipment',
        'Neonatal care specialists',
        '24/7 pediatric support',
        'Temperature-controlled transport'
      ]
    }
  ];

  const whyChooseUs = [
    { iconType: 'lightning', title: 'Quick Response', desc: '15 min average response time' },
    { iconType: 'doctor', title: 'Expert Staff', desc: 'Trained medical professionals' },
    { iconType: 'hospital', title: 'Modern Equipment', desc: 'State-of-the-art facilities' },
    { iconType: 'location', title: 'GPS Tracking', desc: 'Real-time location updates' },
  ];

  return (
    <div className="animate-fade-in">
      <Hero />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4">Our Services</div>
            <h2 className="section-title mb-4">
              Comprehensive Ambulance Services
            </h2>
            <p className="section-subtitle mx-auto">
              We provide a wide range of emergency medical transportation services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={service.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge mb-4">Why Choose Us</div>
              <h2 className="section-title mb-6">
                Trusted Emergency Medical Services
              </h2>
              <p className="section-subtitle mb-8">
                With years of experience and a commitment to excellence, we have become the most trusted
                ambulance service provider in Gurugram and surrounding areas.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => {
                  const icons = {
                    lightning: <path d="M7 2v11h3v9l7-12h-4l4-8z" />,
                    doctor: <path d="M12 2C8.13 2 5 5.13 5 9c0 3.17 2.11 5.85 5 6.71V22h4v-6.29c2.89-.86 5-3.54 5-6.71 0-3.87-3.13-7-7-7zm-1.5 5c.83 0 1.5.67 1.5 1.5S11.33 10 10.5 10 9 9.33 9 8.5 9.67 7 10.5 7zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />,
                    hospital: <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />,
                    location: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  };
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                          {icons[item.iconType]}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-900">{item.title}</h4>
                        <p className="text-sm text-navy-600">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="card p-8 text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Professional Healthcare
                </h3>
                <p className="text-navy-600 mb-6">
                  Our ambulances are equipped with advanced medical equipment and staffed by trained professionals
                </p>
                <Link to="/book" className="btn-primary">
                  Book Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="stat-number !text-primary-500">50K+</div>
              <div className="stat-label !text-slate-300">Lives Saved</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="stat-number !text-primary-500">24/7</div>
              <div className="stat-label !text-slate-300">Available</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="stat-number !text-primary-500">15</div>
              <div className="stat-label !text-slate-300">Min Response</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="stat-number !text-primary-500">100%</div>
              <div className="stat-label !text-slate-300">Professional</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-8 md:p-12">
            <h2 className="section-title mb-6">
              Need Emergency Assistance?
            </h2>
            <p className="section-subtitle mx-auto mb-8">
              Don&apos;t wait in crisis situations. Our emergency hotline is available 24/7
              with trained professionals ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919942000266" className="btn-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call +91-9942000266
              </a>
              <Link to="/book" className="btn-secondary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
