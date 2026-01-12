import { useState, useEffect } from 'react';

const FloatingButtons = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        // Show buttons after a short delay
        const timer = setTimeout(() => setIsVisible(true), 1000);

        const toggleScrollTop = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleScrollTop);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', toggleScrollTop);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`fixed bottom-24 right-4 md:bottom-8 md:right-6 z-50 flex flex-col gap-3 md:gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`w-11 h-11 md:w-12 md:h-12 bg-navy-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-navy-700 active:scale-95 hover:scale-110 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>

            {/* Call Button with Subtle Ring Wave */}
            <div className="relative group">
                {/* Subtle Ring Animation - Smaller & Unique */}
                <span className="absolute -inset-1 rounded-full border-2 border-primary-400 animate-[ping_2s_ease-out_infinite] opacity-40"></span>
                <span className="absolute -inset-0.5 rounded-full border border-primary-300 animate-[pulse_1.5s_ease-in-out_infinite] opacity-30"></span>
                <a
                    href="tel:+919942000266"
                    className="relative w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full shadow-lg shadow-primary-600/40 flex items-center justify-center hover:from-primary-600 hover:to-primary-800 active:scale-95 hover:scale-110 transition-all duration-300"
                    aria-label="Call Now"
                >
                    <svg className="w-6 h-6 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                </a>
            </div>

            {/* WhatsApp Button with Subtle Ring Wave */}
            <div className="relative group">
                {/* Subtle Ring Animation - Smaller & Unique */}
                <span className="absolute -inset-1 rounded-full border-2 border-green-400 animate-[ping_2s_ease-out_infinite] opacity-40" style={{ animationDelay: '0.5s' }}></span>
                <span className="absolute -inset-0.5 rounded-full border border-green-300 animate-[pulse_1.5s_ease-in-out_infinite] opacity-30" style={{ animationDelay: '0.25s' }}></span>
                <a
                    href="https://wa.me/919942000266?text=Hi,%20I%20need%20ambulance%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-lg shadow-green-500/40 flex items-center justify-center hover:from-green-500 hover:to-green-700 active:scale-95 hover:scale-110 transition-all duration-300"
                    aria-label="Chat on WhatsApp"
                >
                    <svg className="w-6 h-6 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default FloatingButtons;
