// Mock API for simulating booking submission
// In a real application, this would make HTTP requests to a backend API

export const submitBooking = async (bookingData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Network error - please try again');
  }

  // Validate required fields
  const requiredFields = ['name', 'phone', 'pickupAddress', 'destination', 'patientCondition', 'pickupTime'];
  const missingFields = requiredFields.filter(field => !bookingData[field]?.trim());

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Validate phone number format
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(bookingData.phone.replace(/\D/g, ''))) {
    throw new Error('Invalid phone number format');
  }

  // Simulate successful booking
  const bookingId = `CPY-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  console.log('Booking submitted successfully:', {
    ...bookingData,
    bookingId,
    submittedAt: new Date().toISOString(),
    status: 'confirmed'
  });

  return {
    success: true,
    bookingId,
    message: 'Booking confirmed successfully',
    estimatedArrival: '15-20 minutes'
  };
};

// Mock function to get service areas
export const getServiceAreas = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    'Gurugram',
    'Delhi NCR',
    'Faridabad',
    'Noida',
    'Ghaziabad',
    'Bahadurgarh',
    'Jhajjar',
    'Rohtak'
  ];
};

// Mock function to get ambulance availability
export const checkAvailability = async (location, ambulanceType) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate availability based on location and type
  const baseAvailability = {
    'Gurugram': { basic: 8, icu: 3, neonatal: 2 },
    'Delhi NCR': { basic: 12, icu: 5, neonatal: 3 },
  };

  const locationData = baseAvailability[location] || { basic: 5, icu: 2, neonatal: 1 };

  return {
    available: locationData[ambulanceType] || 0,
    estimatedWaitTime: Math.floor(Math.random() * 15) + 5, // 5-20 minutes
    location
  };
};
