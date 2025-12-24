import { useState } from 'react';

const Quote = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        serviceType: '',
        pickupLocation: '',
        destination: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open Google Maps with current location
    const openGoogleMaps = (field) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Try to detect if mobile and open native maps app
                    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

                    if (isMobile) {
                        // Opens native Google Maps app with marker at current location
                        const mapsUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
                        window.location.href = mapsUrl;

                        // Fallback for iOS
                        setTimeout(() => {
                            window.open(`https://maps.apple.com/?ll=${latitude},${longitude}&q=Current+Location`, '_blank');
                        }, 500);
                    } else {
                        // Desktop - open in new tab with marker
                        window.open(`https://www.google.com/maps?q=${latitude},${longitude}&z=17`, '_blank');
                    }
                },
                (error) => {
                    alert('Could not get your location. Please allow location access and try again.');
                    console.error('Geolocation error:', error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            window.open('https://www.google.com/maps', '_blank');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create WhatsApp message
        const message = `Quote Request:
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.serviceType}
Pickup: ${formData.pickupLocation}
Destination: ${formData.destination}
Message: ${formData.message}`;

        window.open(`https://wa.me/919942000266?text=${encodeURIComponent(message)}`, '_blank');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="card p-8 md:p-12 text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Quote Request Sent!</h2>
                    <p className="text-navy-600 mb-8">
                        Thank you for your interest. Our team will contact you shortly with a quote.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary"
                    >
                        Request Another Quote
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 animate-fade-in">
            {/* Header */}
            <div className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="badge !bg-primary-600 !text-white mb-4 mx-auto">Get a Quote</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Request a Quote
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Fill out the form below and we&apos;ll provide you with a customized quote for your ambulance service needs.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="max-w-2xl mx-auto">
                    <div className="card p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-navy-800 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your name"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-navy-800 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            {/* Service Type */}
                            <div>
                                <label htmlFor="serviceType" className="block text-sm font-semibold text-navy-800 mb-2">
                                    Service Type *
                                </label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Select a service</option>
                                    <option value="emergency">Emergency Ambulance</option>
                                    <option value="icu">ICU Ambulance</option>
                                    <option value="bls">BLS Ambulance</option>
                                    <option value="neonatal">Neonatal Ambulance</option>
                                    <option value="freezer">Freezer Van</option>
                                    <option value="mortuary">Mortuary Van</option>
                                    <option value="patient-transfer">Patient Transfer</option>
                                    <option value="event-standby">Event Medical Standby</option>
                                </select>
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label htmlFor="pickupLocation" className="block text-sm font-semibold text-navy-800 mb-2">
                                    Pickup Location
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="pickupLocation"
                                        name="pickupLocation"
                                        value={formData.pickupLocation}
                                        onChange={handleChange}
                                        className="form-input flex-1"
                                        placeholder="Enter address or select from map"
                                    />
                                    <button
                                        type="button"
                                        onClick={openGoogleMaps}
                                        className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                                        title="Open Google Maps"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                        <span className="hidden sm:inline">Map</span>
                                    </button>
                                </div>
                                <p className="text-xs text-navy-500 mt-1">Tap Map icon to open Google Maps, then copy-paste the address</p>
                            </div>

                            {/* Destination */}
                            <div>
                                <label htmlFor="destination" className="block text-sm font-semibold text-navy-800 mb-2">
                                    Destination
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="destination"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="form-input flex-1"
                                        placeholder="Hospital or destination address"
                                    />
                                    <button
                                        type="button"
                                        onClick={openGoogleMaps}
                                        className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                                        title="Open Google Maps"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                        <span className="hidden sm:inline">Map</span>
                                    </button>
                                </div>
                                <p className="text-xs text-navy-500 mt-1">Tap Map icon to open Google Maps, then copy-paste the address</p>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-navy-800 mb-2">
                                    Additional Details
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="form-input resize-none"
                                    placeholder="Any specific requirements or questions..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn-primary w-full">
                                Request Quote via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quote;
