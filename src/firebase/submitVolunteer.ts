import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

export async function submitVolunteer(data: any) {
    try {
        const docRef = await addDoc(collection(db, 'volunteers'), {
            ...data,
            createdAt: serverTimestamp(), // 🔥 추가됨
        });
        console.log("✅ Document written with ID:", docRef.id);
    } catch (e) {
        console.error("❌ Error adding document:", e);
    }
}