import { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus, deleteBooking } from '../../firebase/bookingService';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            setBookings(prev => prev.map(b =>
                b.id === id ? { ...b, status: newStatus } : b
            ));
            setSelectedBooking(null);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            await deleteBooking(id);
            setBookings(prev => prev.filter(b => b.id !== id));
            setSelectedBooking(null);
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete booking');
        }
    };

    const filteredBookings = filterStatus === 'all'
        ? bookings
        : bookings.filter(b => b.status === filterStatus);

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
            completed: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200'
        };
        return styles[status] || styles.pending;
    };

    const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex gap-2">
                    <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Bookings</h1>
                    <p className="text-slate-500 mt-1">Manage ambulance booking requests</p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Filter:</span>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">All Bookings</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {statusOptions.map(status => (
                    <div key={status} className="bg-white rounded-xl p-4 border border-slate-100">
                        <p className="text-2xl font-bold text-slate-800">
                            {bookings.filter(b => b.status === status).length}
                        </p>
                        <p className="text-slate-500 text-sm capitalize">{status}</p>
                    </div>
                ))}
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-slate-500">No bookings found</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Booking ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Pickup</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-primary-600 font-medium">{booking.bookingId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-800">{booking.name}</p>
                                                <p className="text-sm text-slate-500">{booking.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize text-slate-700">{booking.ambulanceType}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-600 text-sm max-w-xs truncate">{booking.pickupAddress}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-500 text-sm">
                                                {booking.createdAt?.toLocaleDateString?.() || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Booking Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Booking Details</h2>
                                <p className="text-sm text-slate-500 font-mono">{selectedBooking.bookingId}</p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Customer Name</p>
                                    <p className="font-semibold text-slate-800">{selectedBooking.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Phone</p>
                                    <a href={`tel:${selectedBooking.phone}`} className="font-semibold text-primary-600 hover:underline">{selectedBooking.phone}</a>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Ambulance Type</p>
                                    <p className="font-semibold text-slate-800 capitalize">{selectedBooking.ambulanceType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Patient Condition</p>
                                    <p className="font-semibold text-slate-800 capitalize">{selectedBooking.patientCondition}</p>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Pickup Address</p>
                                <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedBooking.pickupAddress}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Destination</p>
                                <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedBooking.destination}</p>
                            </div>

                            {/* Pickup Time */}
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Requested Pickup Time</p>
                                <p className="font-semibold text-slate-800">{selectedBooking.pickupTime}</p>
                            </div>

                            {/* Notes */}
                            {selectedBooking.notes && (
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Additional Notes</p>
                                    <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                                </div>
                            )}

                            {/* Status Update */}
                            <div>
                                <p className="text-sm text-slate-500 mb-2">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {statusOptions.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedBooking.id, status)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all ${selectedBooking.status === status
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                                onClick={() => handleDelete(selectedBooking.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                Delete Booking
                            </button>
                            <a
                                href={`https://wa.me/${selectedBooking.phone?.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;
