import { useState, useEffect } from 'react';
import { getContacts, markContactAsRead, deleteContact } from '../../firebase/contactService';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await markContactAsRead(id);
            setContacts(prev => prev.map(c =>
                c.id === id ? { ...c, status: 'read' } : c
            ));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await deleteContact(id);
            setContacts(prev => prev.filter(c => c.id !== id));
            setSelectedContact(null);
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Failed to delete');
        }
    };

    const handleViewContact = (contact) => {
        setSelectedContact(contact);
        if (contact.status === 'unread') {
            handleMarkRead(contact.id);
        }
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

    const unreadCount = contacts.filter(c => c.status === 'unread').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
                    <p className="text-slate-500 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
                    </p>
                </div>
            </div>

            {/* Messages List */}
            {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-slate-500">No messages yet</p>
                    <p className="text-slate-400 text-sm mt-1">Contact form submissions will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => handleViewContact(contact)}
                            className={`p-6 cursor-pointer hover:bg-slate-50 transition-colors ${contact.status === 'unread' ? 'bg-primary-50/50' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${contact.status === 'unread' ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    <span className="text-lg font-bold">{contact.name?.charAt(0).toUpperCase()}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`font-semibold truncate ${contact.status === 'unread' ? 'text-slate-900' : 'text-slate-700'
                                            }`}>
                                            {contact.name}
                                        </h3>
                                        <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                                            {contact.createdAt?.toLocaleDateString?.() || 'N/A'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-1">{contact.email}</p>
                                    <p className={`text-sm truncate ${contact.status === 'unread' ? 'text-slate-700 font-medium' : 'text-slate-500'
                                        }`}>
                                        {contact.subject || contact.message?.substring(0, 100)}
                                    </p>
                                </div>

                                {/* Unread indicator */}
                                {contact.status === 'unread' && (
                                    <div className="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-primary-600">
                                        {selectedContact.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedContact.name}</h2>
                                    <p className="text-sm text-slate-500">{selectedContact.email}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {selectedContact.phone && (
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Phone</p>
                                    <a href={`tel:${selectedContact.phone}`} className="font-semibold text-primary-600">
                                        {selectedContact.phone}
                                    </a>
                                </div>
                            )}

                            {selectedContact.subject && (
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Subject</p>
                                    <p className="font-semibold text-slate-800">{selectedContact.subject}</p>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-slate-500 mb-1">Message</p>
                                <div className="text-slate-700 bg-slate-50 p-4 rounded-xl whitespace-pre-wrap">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div className="text-xs text-slate-400">
                                Received: {selectedContact.createdAt?.toLocaleString?.() || 'N/A'}
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                                onClick={() => handleDelete(selectedContact.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                Delete
                            </button>
                            <div className="flex gap-3">
                                <a
                                    href={`mailto:${selectedContact.email}`}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                >
                                    Reply Email
                                </a>
                                {selectedContact.phone && (
                                    <a
                                        href={`https://wa.me/${selectedContact.phone?.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                    >
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContacts;
