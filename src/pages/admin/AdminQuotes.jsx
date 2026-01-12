import { useState, useEffect } from 'react';
import { getQuotes, updateQuoteStatus, deleteQuote } from '../../firebase/quoteService';

const AdminQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const data = await getQuotes();
            setQuotes(data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateQuoteStatus(id, newStatus);
            setQuotes(prev => prev.map(q =>
                q.id === id ? { ...q, status: newStatus } : q
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this quote request?')) return;

        try {
            await deleteQuote(id);
            setQuotes(prev => prev.filter(q => q.id !== id));
            setSelectedQuote(null);
        } catch (error) {
            console.error('Error deleting quote:', error);
            alert('Failed to delete quote');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            new: 'bg-blue-100 text-blue-700',
            contacted: 'bg-amber-100 text-amber-700',
            quoted: 'bg-green-100 text-green-700',
            closed: 'bg-slate-100 text-slate-700'
        };
        return styles[status] || styles.new;
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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Quote Requests</h1>
                <p className="text-slate-500 mt-1">View and manage quote inquiries</p>
            </div>

            {/* Quotes Grid */}
            {quotes.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-slate-500">No quote requests yet</p>
                    <p className="text-slate-400 text-sm mt-1">Quote requests will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quotes.map((quote) => (
                        <div key={quote.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-slate-500">{quote.quoteId}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(quote.status)}`}>
                                        {quote.status}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mb-1">{quote.name}</h3>
                                <p className="text-slate-500 text-sm mb-4">{quote.phone}</p>

                                <div className="bg-slate-50 rounded-xl p-3 mb-4">
                                    <p className="text-xs text-slate-500 mb-1">Service Type</p>
                                    <p className="text-slate-800 font-medium capitalize">{quote.serviceType}</p>
                                </div>

                                <p className="text-xs text-slate-400">
                                    {quote.createdAt?.toLocaleDateString?.() || 'N/A'}
                                </p>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    onClick={() => setSelectedQuote(quote)}
                                    className="text-primary-600 font-medium text-sm hover:underline"
                                >
                                    View Details
                                </button>
                                <a
                                    href={`https://wa.me/${quote.phone?.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-green-600 font-medium text-sm hover:underline"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    </svg>
                                    Contact
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quote Detail Modal */}
            {selectedQuote && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedQuote(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Quote Details</h2>
                                <p className="text-sm text-slate-500 font-mono">{selectedQuote.quoteId}</p>
                            </div>
                            <button onClick={() => setSelectedQuote(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Name</p>
                                    <p className="font-semibold text-slate-800">{selectedQuote.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Phone</p>
                                    <a href={`tel:${selectedQuote.phone}`} className="font-semibold text-primary-600">{selectedQuote.phone}</a>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 mb-1">Service Type</p>
                                <p className="font-semibold text-slate-800 capitalize">{selectedQuote.serviceType}</p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 mb-1">Pickup Address</p>
                                <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedQuote.pickupAddress || 'Not provided'}</p>
                            </div>

                            {selectedQuote.message && (
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Message</p>
                                    <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{selectedQuote.message}</p>
                                </div>
                            )}

                            {/* Status Update */}
                            <div>
                                <p className="text-sm text-slate-500 mb-2">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {['new', 'contacted', 'quoted', 'closed'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedQuote.id, status)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all ${selectedQuote.status === status
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

                        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                                onClick={() => handleDelete(selectedQuote.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                Delete
                            </button>
                            <a
                                href={`https://wa.me/${selectedQuote.phone?.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminQuotes;
