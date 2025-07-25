import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function submitVolunteer(data: any) {
    try {
        const docRef = await addDoc(collection(db, 'volunteers'), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}