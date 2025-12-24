const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-navy-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
