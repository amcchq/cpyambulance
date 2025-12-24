import { useState } from 'react';
import { submitBooking } from '../utils/mockApi';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupAddress: '',
    destination: '',
    patientCondition: '',
    ambulanceType: 'basic',
    pickupTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Location tracking state
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Get user's current location with reverse geocoding
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
          // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
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
            // Build readable address with all available details
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
            // Fallback with Maps link
            setFormData(prev => ({
              ...prev,
              pickupAddress: `📍 Exact Location: ${mapsLink}`
            }));
          }
        } catch {
          // Fallback with Maps link if API fails
          setFormData(prev => ({
            ...prev,
            pickupAddress: `📍 Exact Location: ${mapsLink}`
          }));
        }

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please allow location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('Failed to get location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.patientCondition) newErrors.patientCondition = 'Please select patient condition';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitBooking(formData);

      // Build location link if available
      const locationLink = location
        ? `\n📍 GPS Location: https://maps.google.com/?q=${location.latitude},${location.longitude}`
        : '';

      const message = `Hi, I would like to book an ambulance:

Name: ${formData.name}
Phone: ${formData.phone}
Pickup: ${formData.pickupAddress}
Destination: ${formData.destination}
Condition: ${formData.patientCondition}
Type: ${formData.ambulanceType}
Time: ${formData.pickupTime}
Notes: ${formData.notes}${locationLink}

Please confirm my booking.`;

      const whatsappUrl = `https://wa.me/919942000266?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Booking submission failed:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi, I would like to book an ambulance:

Name: ${formData.name}
Phone: ${formData.phone}
Pickup: ${formData.pickupAddress}
Destination: ${formData.destination}
Condition: ${formData.patientCondition}
Type: ${formData.ambulanceType}
Time: ${formData.pickupTime}
Notes: ${formData.notes}

Please confirm my booking.`;

    const whatsappUrl = `https://wa.me/919942000266?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="card p-8 md:p-12 text-center animate-slide-up">
        <div className="icon-box w-20 h-20 mx-auto mb-6 !bg-green-100 !text-green-600">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-4">Booking Successful!</h2>
        <p className="text-navy-600 mb-8 max-w-md mx-auto">
          Thank you for choosing CPY Ambulance. We will contact you shortly to confirm your booking.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              pickupAddress: '',
              destination: '',
              patientCondition: '',
              ambulanceType: 'basic',
              pickupTime: '',
              notes: ''
            });
          }}
          className="btn-primary"
        >
          Book Another Ambulance
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-10">
      <div className="text-center mb-8">
        <h2 className="section-title !text-3xl mb-3">Book Your Ambulance</h2>
        <p className="text-navy-600">Fill out the form below for quick ambulance booking</p>
      </div>

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
              className="form-input"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-primary-600 text-sm mt-2">{errors.name}</p>}
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
              className="form-input"
              placeholder="10-digit mobile number"
            />
            {errors.phone && <p className="text-primary-600 text-sm mt-2">{errors.phone}</p>}
          </div>
        </div>

        {/* Pickup Address */}
        <div>
          <label htmlFor="pickupAddress" className="block text-sm font-semibold text-navy-800 mb-2">
            Pickup Address *
          </label>
          <textarea
            id="pickupAddress"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            rows={3}
            className="form-input resize-none"
            placeholder="Complete pickup address with landmarks"
          />
          {errors.pickupAddress && <p className="text-primary-600 text-sm mt-2">{errors.pickupAddress}</p>}

          {/* Use My Current Location Button */}
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

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-navy-800 mb-2">
            Destination *
          </label>
          <textarea
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            rows={3}
            className="form-input resize-none"
            placeholder="Complete destination address"
          />
          {errors.destination && <p className="text-primary-600 text-sm mt-2">{errors.destination}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Condition */}
          <div>
            <label htmlFor="patientCondition" className="block text-sm font-semibold text-navy-800 mb-2">
              Patient Condition *
            </label>
            <select
              id="patientCondition"
              name="patientCondition"
              value={formData.patientCondition}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select condition</option>
              <option value="critical">Critical/Emergency</option>
              <option value="serious">Serious but stable</option>
              <option value="stable">Stable condition</option>
              <option value="pregnancy">Pregnancy/Maternity</option>
              <option value="neonatal">Neonatal/Infant</option>
              <option value="other">Other</option>
            </select>
            {errors.patientCondition && <p className="text-primary-600 text-sm mt-2">{errors.patientCondition}</p>}
          </div>

          {/* Ambulance Type */}
          <div>
            <label className="block text-sm font-semibold text-navy-800 mb-3">
              Ambulance Type *
            </label>

            {/* Emergency Ambulance Group - RED */}
            <div className="border-2 border-red-300 rounded-xl p-4 mb-4 bg-red-50">
              <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                🚨 Emergency Ambulance
              </p>
              <div className="space-y-2">
                {[
                  { value: 'basic', label: 'BLS Ambulance', desc: 'Basic Life Support' },
                  { value: 'icu', label: 'ICU Ambulance', desc: 'Intensive Care Unit' },
                  { value: 'neonatal', label: 'Neonatal Ambulance', desc: 'Specialized for infants' },
                  { value: 'patient-transfer', label: 'Bed to Bed Patient Transfer', desc: 'Hospital to hospital' },
                ].map((type) => (
                  <label key={type.value} className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <input
                      type="radio"
                      name="ambulanceType"
                      value={type.value}
                      checked={formData.ambulanceType === type.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500"
                    />
                    <span className="ml-3 text-sm text-navy-700">
                      <strong className="text-navy-900">{type.label}</strong>
                      <span className="text-navy-500"> - {type.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Non-Emergency Transport Group - BLUE */}
            <div className="border-2 border-blue-300 rounded-xl p-4 bg-blue-50">
              <p className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                🚐 Non-Emergency Transport
              </p>
              <div className="space-y-2">
                {[
                  { value: 'freezer', label: 'Home Freezer Box', desc: 'Temperature controlled at home' },
                  { value: 'mortuary', label: 'Mortuary Van', desc: 'Deceased transport' },
                ].map((type) => (
                  <label key={type.value} className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <input
                      type="radio"
                      name="ambulanceType"
                      value={type.value}
                      checked={formData.ambulanceType === type.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-blue-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-navy-700">
                      <strong className="text-navy-900">{type.label}</strong>
                      <span className="text-navy-500"> - {type.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Time */}
        <div>
          <label htmlFor="pickupTime" className="block text-sm font-semibold text-navy-800 mb-2">
            Preferred Pickup Time *
          </label>
          <input
            type="datetime-local"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            className="form-input"
          />
          {errors.pickupTime && <p className="text-primary-600 text-sm mt-2">{errors.pickupTime}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-navy-800 mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="form-input resize-none"
            placeholder="Any special requirements or medical information"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : '📋 Submit Booking'}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="btn-secondary flex-1"
          >
            📱 Book via WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
