import { useState, useEffect } from 'react';

const LoadingSpinner = () => {
    const [showText, setShowText] = useState(false);
    const [showTagline, setShowTagline] = useState(false);

    useEffect(() => {
        // Stagger the text appearance
        const timer1 = setTimeout(() => setShowText(true), 200);
        const timer2 = setTimeout(() => setShowTagline(true), 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            {/* Bouncing Dots Loader */}
            <div className="flex flex-row gap-2 mb-8">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>

            {/* CPY Ambulance Branding */}
            <div className="text-center">
                <h2
                    className={`text-3xl md:text-4xl font-bold mb-3 transition-all duration-500 ease-out ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                >
                    <span className="text-navy-900">CPY</span> <span className="text-primary-600">Ambulance</span>
                </h2>

                {/* Premium Tagline */}
                <p
                    className={`text-navy-500 text-sm md:text-base font-medium tracking-wide transition-all duration-500 ease-out ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                >
                    Your Emergency. Our Priority.
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
