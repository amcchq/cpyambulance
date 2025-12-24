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
            <label className="block text-sm font-semibold text-navy-800 mb-2">
              Ambulance Type *
            </label>
            <div className="space-y-3">
              {[
                { value: 'basic', label: 'BLS Ambulance', desc: 'Basic Life Support' },
                { value: 'icu', label: 'ICU Ambulance', desc: 'Intensive Care Unit' },
                { value: 'neonatal', label: 'Neonatal Ambulance', desc: 'Specialized for infants' },
              ].map((type) => (
                <label key={type.value} className="flex items-center cursor-pointer group p-3 rounded-xl hover:bg-primary-50 transition-colors duration-200 border-2 border-transparent hover:border-primary-200">
                  <input
                    type="radio"
                    name="ambulanceType"
                    value={type.value}
                    checked={formData.ambulanceType === type.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
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
