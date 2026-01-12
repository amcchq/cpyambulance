import { useState } from 'react';
import { createQuote } from '../firebase/quoteService';

const Quote = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        serviceType: '',
        pickupAddress: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [location, setLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Get current location - same as BookingForm
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        setLocationLoading(true);
        setLocationError('');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                // Google Maps link for exact pinpoint
                const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;

                try {
                    // Use OpenStreetMap Nominatim for reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
                        {
                            headers: {
                                'Accept-Language': 'en'
                            }
                        }
                    );
                    const data = await response.json();

                    if (data && data.address) {
                        const addr = data.address;
                        const parts = [];
                        if (addr.house_number) parts.push(addr.house_number);
                        if (addr.road || addr.street) parts.push(addr.road || addr.street);
                        if (addr.neighbourhood) parts.push(addr.neighbourhood);
                        if (addr.suburb) parts.push(addr.suburb);
                        if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
                        if (addr.county || addr.state_district) parts.push(addr.county || addr.state_district);
                        if (addr.state) parts.push(addr.state);
                        if (addr.postcode) parts.push(`PIN: ${addr.postcode}`);
                        if (addr.country) parts.push(addr.country);

                        const fullAddress = parts.length > 0 ? parts.join(', ') : data.display_name;

                        setFormData(prev => ({
                            ...prev,
                            pickupAddress: `${fullAddress}\n\n📍 Exact Location: ${mapsLink}`
                        }));
                    } else {
                        setFormData(prev => ({
                            ...prev,
                            pickupAddress: `📍 Exact Location: ${mapsLink}`
                        }));
                    }
                } catch (error) {
                    setFormData(prev => ({
                        ...prev,
                        pickupAddress: `📍 Exact Location: ${mapsLink}`
                    }));
                }
                setLocationLoading(false);
            },
            (error) => {
                setLocationError('Could not get your location. Please allow location access.');
                setLocationLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save to Firebase database
            await createQuote(formData);
        } catch (error) {
            console.error('Error saving quote:', error);
        }

        // Create WhatsApp message
        const message = `Quote Request:
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.serviceType}
Pickup: ${formData.pickupAddress}
Message: ${formData.message}`;

        window.open(`https://wa.me/919942000266?text=${encodeURIComponent(message)}`, '_blank');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-navy-50 flex items-center justify-center px-4">
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
        <div className="min-h-screen bg-navy-50 animate-fade-in">
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
                                <label className="block text-sm font-semibold text-navy-800 mb-3">
                                    Service Type *
                                </label>

                                {/* Service Type - Both sections always open */}
                                <div className="border-2 border-slate-200 rounded-xl bg-white shadow-sm p-4">

                                    {/* Emergency Ambulance - Red Section */}
                                    <div className="bg-red-50 border-2 border-red-400 rounded-xl mb-4">
                                        <div className="p-3">
                                            <p className="text-sm font-bold text-red-700 flex items-center gap-2 mb-3">
                                                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                                                🚨 Emergency Ambulance
                                            </p>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'icu', label: 'ICU Ambulance', desc: 'Intensive Care Unit' },
                                                    { value: 'bls', label: 'BLS Ambulance', desc: 'Basic Life Support' },
                                                    { value: 'neonatal', label: 'Neonatal Ambulance', desc: 'Specialized for infants' },
                                                    { value: 'patient-transfer', label: 'Bed to Bed Patient Transfer', desc: 'Hospital to hospital' },
                                                    { value: 'event-standby', label: 'Event Medical Standby', desc: 'For events & functions' },
                                                ].map((type) => (
                                                    <label key={type.value} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-red-100 transition-colors duration-200">
                                                        <input
                                                            type="radio"
                                                            name="serviceType"
                                                            value={type.value}
                                                            checked={formData.serviceType === type.value}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500"
                                                        />
                                                        <span className="ml-2 text-sm text-navy-700">
                                                            <strong className="text-navy-900">{type.label}</strong>
                                                            <span className="text-navy-500"> - {type.desc}</span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Non-Emergency Transport - Blue Section */}
                                    <div className="bg-blue-50 border-2 border-blue-400 rounded-xl">
                                        <div className="p-3">
                                            <p className="text-sm font-bold text-blue-700 flex items-center gap-2 mb-3">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                                🚐 Non-Emergency Transport
                                            </p>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'freezer', label: 'Home Freezer Box', desc: 'Temperature controlled at home' },
                                                    { value: 'mortuary', label: 'Mortuary Van', desc: 'Deceased transport' },
                                                ].map((type) => (
                                                    <label key={type.value} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                                        <input
                                                            type="radio"
                                                            name="serviceType"
                                                            value={type.value}
                                                            checked={formData.serviceType === type.value}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 text-blue-600 border-blue-300 focus:ring-blue-500"
                                                        />
                                                        <span className="ml-2 text-sm text-navy-700">
                                                            <strong className="text-navy-900">{type.label}</strong>
                                                            <span className="text-navy-500"> - {type.desc}</span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pickup Address */}
                            <div>
                                <label htmlFor="pickupLocation" className="block text-sm font-semibold text-navy-800 mb-2">
                                    Pickup Address *
                                </label>
                                <textarea
                                    id="pickupAddress"
                                    name="pickupAddress"
                                    value={formData.pickupAddress}
                                    onChange={handleChange}
                                    rows={3}
                                    className="form-input w-full resize-none"
                                    placeholder="Complete pickup address with landmarks"
                                />

                                {/* Use My Current Location Button - same as BookingForm */}
                                <button
                                    type="button"
                                    onClick={getCurrentLocation}
                                    disabled={locationLoading}
                                    className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${location
                                        ? 'bg-green-50 border-green-500 text-green-700'
                                        : 'bg-white border-primary-500 text-primary-600 hover:bg-primary-50'
                                        } ${locationLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {locationLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Getting Location...
                                        </>
                                    ) : location ? (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                            Location Captured
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                                            </svg>
                                            Use My Current Location
                                        </>
                                    )}
                                </button>
                                {locationError && <p className="text-primary-600 text-sm mt-2">{locationError}</p>}
                                {location && (
                                    <p className="text-green-600 text-sm mt-2">
                                        ✓ Location saved! Will be shared with booking details.
                                    </p>
                                )}
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
                                    className="form-input w-full resize-none"
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
