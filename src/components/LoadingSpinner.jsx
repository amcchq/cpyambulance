const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            {/* ECG Heartbeat Loader */}
            <div className="loading mb-8">
                <svg width="64px" height="48px">
                    <polyline
                        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                        id="back"
                        style={{
                            fill: 'none',
                            stroke: '#ff4d5033',
                            strokeWidth: 3,
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round'
                        }}
                    />
                    <polyline
                        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                        id="front"
                        style={{
                            fill: 'none',
                            stroke: '#ef4444',
                            strokeWidth: 3,
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeDasharray: '48, 144',
                            strokeDashoffset: 192,
                            animation: 'dash 1.4s linear infinite'
                        }}
                    />
                </svg>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
                Welcome to <span className="text-primary-600">CPY Ambulance</span>
            </h2>
            <p className="text-navy-500">Loading emergency services...</p>

            {/* Animation Keyframes */}
            <style>{`
        @keyframes dash {
          72.5% {
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
