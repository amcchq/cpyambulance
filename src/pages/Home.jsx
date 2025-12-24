import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      title: 'Emergency Ambulance',
      description: '24/7 emergency response with rapid deployment and professional medical care.',
      icon: '🚑',
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
      icon: '🏥',
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
      icon: '🚐',
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
      icon: '👶',
      features: [
        'Incubator and warming equipment',
        'Neonatal care specialists',
        '24/7 pediatric support',
        'Temperature-controlled transport'
      ]
    }
  ];

  const whyChooseUs = [
    { icon: '⚡', title: 'Quick Response', desc: '15 min average response time' },
    { icon: '👨‍⚕️', title: 'Expert Staff', desc: 'Trained medical professionals' },
    { icon: '🏥', title: 'Modern Equipment', desc: 'State-of-the-art facilities' },
    { icon: '📍', title: 'GPS Tracking', desc: 'Real-time location updates' },
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
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="icon-box !w-14 !h-14 flex-shrink-0">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">{item.title}</h4>
                      <p className="text-sm text-navy-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="card p-8 text-center">
                <div className="text-8xl mb-6 animate-float">🏥</div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Professional Healthcare
                </h3>
                <p className="text-navy-600 mb-6">
                  Our ambulances are equipped with advanced medical equipment and staffed by trained professionals
                </p>
                <Link to="/book" className="btn-primary">
                  Book Now →
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
                📞 Call +91-9942000266
              </a>
              <Link to="/book" className="btn-secondary">
                🚑 Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
