import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from '../BookingForm';

// Mock the API
jest.mock('../../utils/mockApi', () => ({
  submitBooking: jest.fn()
}));

import { submitBooking } from '../../utils/mockApi';

describe('BookingForm', () => {
  beforeEach(() => {
    submitBooking.mockClear();
  });

  test('renders all form fields', () => {
    render(<BookingForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pickup address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/patient condition/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred pickup time/i)).toBeInTheDocument();
    expect(screen.getByText(/submit booking/i)).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    render(<BookingForm />);

    const submitButton = screen.getByText(/submit booking/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/pickup address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/destination is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select patient condition/i)).toBeInTheDocument();
      expect(screen.getByText(/pickup time is required/i)).toBeInTheDocument();
    });
  });

  test('validates phone number format', async () => {
    render(<BookingForm />);

    const phoneInput = screen.getByLabelText(/phone number/i);
    const submitButton = screen.getByText(/submit booking/i);

    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid 10-digit phone number/i)).toBeInTheDocument();
    });
  });

  test('accepts valid phone number', async () => {
    render(<BookingForm />);

    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '9942000266' } });

    expect(phoneInput.value).toBe('9942000266');
  });

  test('submits form successfully with valid data', async () => {
    submitBooking.mockResolvedValueOnce({ success: true, bookingId: 'CPY-123' });

    render(<BookingForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '9942000266' } });
    fireEvent.change(screen.getByLabelText(/pickup address/i), { target: { value: '123 Main St, Gurugram' } });
    fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'City Hospital, Delhi' } });

    const conditionSelect = screen.getByLabelText(/patient condition/i);
    fireEvent.change(conditionSelect, { target: { value: 'critical' } });

    const timeInput = screen.getByLabelText(/preferred pickup time/i);
    const futureTime = new Date();
    futureTime.setHours(futureTime.getHours() + 1);
    fireEvent.change(timeInput, { target: { value: futureTime.toISOString().slice(0, 16) } });

    const submitButton = screen.getByText(/submit booking/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitBooking).toHaveBeenCalledWith({
        name: 'John Doe',
        phone: '9942000266',
        pickupAddress: '123 Main St, Gurugram',
        destination: 'City Hospital, Delhi',
        patientCondition: 'critical',
        ambulanceType: 'basic',
        pickupTime: futureTime.toISOString().slice(0, 16),
        notes: ''
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/booking successful/i)).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    submitBooking.mockRejectedValueOnce(new Error('Network error'));

    render(<BookingForm />);

    // Fill out minimal required fields
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '9942000266' } });
    fireEvent.change(screen.getByLabelText(/pickup address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'Hospital' } });

    const conditionSelect = screen.getByLabelText(/patient condition/i);
    fireEvent.change(conditionSelect, { target: { value: 'critical' } });

    const timeInput = screen.getByLabelText(/preferred pickup time/i);
    const futureTime = new Date();
    futureTime.setHours(futureTime.getHours() + 1);
    fireEvent.change(timeInput, { target: { value: futureTime.toISOString().slice(0, 16) } });

    const submitButton = screen.getByText(/submit booking/i);
    fireEvent.click(submitButton);

    // The form should not show success message when API fails
    await waitFor(() => {
      expect(submitBooking).toHaveBeenCalled();
    });

    // Form should still be visible (not showing success state)
    expect(screen.queryByText(/booking successful/i)).not.toBeInTheDocument();
  });

  test('WhatsApp booking button opens correct URL', () => {
    // Mock window.open
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<BookingForm />);

    const whatsappButton = screen.getByText(/book via whatsapp/i);
    fireEvent.click(whatsappButton);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/919942000266'),
      '_blank'
    );
  });
});
