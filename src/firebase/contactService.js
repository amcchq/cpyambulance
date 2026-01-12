// Contact Service - CRUD Operations for Contact Inquiries
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'contacts';

// Create a new contact inquiry
export const createContact = async (contactData) => {
    try {
        const contactWithMeta = {
            ...contactData,
            status: 'unread',
            contactId: `CT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), contactWithMeta);
        return {
            success: true,
            id: docRef.id,
            contactId: contactWithMeta.contactId,
            message: 'Message sent successfully'
        };
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

// Get all contacts (for admin)
export const getContacts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

// Get single contact by ID
export const getContactById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching contact:', error);
        throw error;
    }
};

// Mark contact as read
export const markContactAsRead = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            status: 'read',
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Marked as read' };
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};

// Delete contact
export const deleteContact = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
        return { success: true, message: 'Contact deleted successfully' };
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};
