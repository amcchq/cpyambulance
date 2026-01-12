// Booking Service - CRUD Operations for Ambulance Bookings
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

const COLLECTION_NAME = 'bookings';

// Create a new booking
export const createBooking = async (bookingData) => {
    try {
        const bookingWithMeta = {
            ...bookingData,
            status: 'pending',
            bookingId: `EMR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), bookingWithMeta);
        return {
            success: true,
            id: docRef.id,
            bookingId: bookingWithMeta.bookingId,
            message: 'Booking created successfully'
        };
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// Get all bookings (for admin)
export const getBookings = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

// Get single booking by ID
export const getBookingById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            status,
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

// Update full booking
export const updateBooking = async (id, data) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true, message: 'Booking updated successfully' };
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

// Delete booking
export const deleteBooking = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
        return { success: true, message: 'Booking deleted successfully' };
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

// Get booking stats
export const getBookingStats = async () => {
    try {
        const bookings = await getBookings();
        return {
            total: bookings.length,
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            completed: bookings.filter(b => b.status === 'completed').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};
