// Quote Service - CRUD Operations for Quote Requests
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

const COLLECTION_NAME = 'quotes';

// Create a new quote request
export const createQuote = async (quoteData) => {
    try {
        const quoteWithMeta = {
            ...quoteData,
            status: 'new',
            quoteId: `QT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), quoteWithMeta);
        return {
            success: true,
            id: docRef.id,
            quoteId: quoteWithMeta.quoteId,
            message: 'Quote request submitted successfully'
        };
    } catch (error) {
        console.error('Error creating quote:', error);
        throw error;
    }
};

// Get all quotes (for admin)
export const getQuotes = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
};

// Get single quote by ID
export const getQuoteById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
};

// Update quote status
export const updateQuoteStatus = async (id, status) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            status,
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Quote status updated' };
    } catch (error) {
        console.error('Error updating quote:', error);
        throw error;
    }
};

// Delete quote
export const deleteQuote = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
        return { success: true, message: 'Quote deleted successfully' };
    } catch (error) {
        console.error('Error deleting quote:', error);
        throw error;
    }
};
