import { useState, useEffect } from 'react';
import { getBookingStats, getBookings } from '../../firebase/bookingService';
import { getQuotes } from '../../firebase/quoteService';
import { getContacts } from '../../firebase/contactService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        totalQuotes: 0,
        totalContacts: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [bookings, quotes, contacts] = await Promise.all([
                getBookings(),
                getQuotes(),
                getContacts()
            ]);

            setStats({
                totalBookings: bookings.length,
                pendingBookings: bookings.filter(b => b.status === 'pending').length,
                totalQuotes: quotes.length,
                totalContacts: contacts.filter(c => c.status === 'unread').length
            });

            setRecentBookings(bookings.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Total Bookings',
            value: stats.totalBookings,
            icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            ),
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-100',
            valueColor: 'text-blue-600'
        },
        {
            label: 'Pending Bookings',
            value: stats.pendingBookings,
            icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
            ),
            iconColor: 'text-amber-600',
            bgColor: 'bg-amber-100',
            valueColor: 'text-amber-600'
        },
        {
            label: 'Quote Requests',
            value: stats.totalQuotes,
            icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
            ),
            iconColor: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            valueColor: 'text-emerald-600'
        },
        {
            label: 'Unread Messages',
            value: stats.totalContacts,
            icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
            iconColor: 'text-purple-600',
            bgColor: 'bg-purple-100',
            valueColor: 'text-purple-600'
        }
    ];

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-700',
            confirmed: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        return styles[status] || styles.pending;
    };

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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1">Welcome back! Here's your overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.iconColor}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-3xl font-bold ${stat.valueColor}`}>
                                {stat.value}
                            </span>
                        </div>
                        <p className="text-slate-600 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Recent Bookings</h2>
                        <a href="/admin/bookings" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                            View All →
                        </a>
                    </div>
                </div>

                {recentBookings.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-slate-500">No bookings yet</p>
                        <p className="text-slate-400 text-sm mt-1">Bookings will appear here when customers submit them.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-slate-600">{booking.bookingId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-slate-800">{booking.name}</p>
                                                <p className="text-sm text-slate-500">{booking.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-600 capitalize">{booking.ambulanceType}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-500 text-sm">
                                                {booking.createdAt?.toLocaleDateString?.() || 'N/A'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="/admin/bookings" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Manage Bookings</h3>
                            <p className="text-blue-100 text-sm mt-1">View and update booking status</p>
                        </div>
                        <svg className="w-8 h-8 opacity-75 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </a>

                <a href="/admin/quotes" className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Quote Requests</h3>
                            <p className="text-emerald-100 text-sm mt-1">Review pricing inquiries</p>
                        </div>
                        <svg className="w-8 h-8 opacity-75 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </a>

                <a href="/admin/contacts" className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Messages</h3>
                            <p className="text-purple-100 text-sm mt-1">View contact inquiries</p>
                        </div>
                        <svg className="w-8 h-8 opacity-75 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default AdminDashboard;
