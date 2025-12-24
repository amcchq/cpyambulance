import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Emergency Medical Services",
      subtitle: "Designed to reach the scene of an emergency quickly, equipped with advanced medical equipment.",
      image: "/hero1.png",
    },
    {
      title: "24/7 Rapid Response",
      subtitle: "When every second counts, our trained paramedics are ready to provide life-saving care.",
      image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1920&q=80",
    },
    {
      title: "Advanced Life Support",
      subtitle: "State-of-the-art ICU ambulances with ventilators, cardiac monitors, and critical care facilities.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1920&q=80",
    },
    {
      title: "Professional Medical Staff",
      subtitle: "Highly trained EMTs and paramedics dedicated to saving lives with compassion and expertise.",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=80",
    },
    {
      title: "Your Safety, Our Mission",
      subtitle: "Trusted by thousands of families in Gurugram for reliable and fast emergency response.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-navy-900">
      {/* Background Slides with Zoom Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Background Image with Zoom Animation */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Premium Dark Gradient Overlay - Reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Slide Indicators - Vertical Line Style */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-500 ${index === currentSlide
                      ? 'w-1 h-8 bg-primary-600 rounded-full'
                      : 'w-1 h-4 bg-white/40 rounded-full hover:bg-white/70'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm font-medium">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

            {/* Title with Animation - Premium Style */}
            <div className="overflow-hidden">
              <h1
                key={`title-${currentSlide}`}
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight"
                style={{
                  animation: 'slideUp 0.8s ease-out forwards',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <span className="text-primary-500 drop-shadow-lg">24/7</span>
                <span className="text-white drop-shadow-lg"> {slides[currentSlide].title.replace('24/7 ', '').replace('24/7', '')}</span>
              </h1>
            </div>

            {/* Subtitle with Animation - Premium Style */}
            <div className="overflow-hidden">
              <p
                key={`subtitle-${currentSlide}`}
                className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl font-medium"
                style={{
                  animation: 'slideUp 0.8s ease-out 0.2s forwards',
                  opacity: 0,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                }}
              >
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <div
              style={{
                animation: 'slideUp 0.8s ease-out 0.4s forwards',
                opacity: 0
              }}
            >
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary-600/30"
              >
                Get a Quote
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent z-10" />

      {/* Slide Up Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
