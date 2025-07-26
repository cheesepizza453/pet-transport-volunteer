import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { VolunteerFormData } from '@/component/common/modal/modal.add.info';

export async function getVolunteers(): Promise<VolunteerFormData[]> {
    const querySnapshot = await getDocs(collection(db, 'volunteers'));
    const data: VolunteerFormData[] = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data() as VolunteerFormData);
    });
    return data;
}

export async function submitVolunteer(data: any) {
    try {
        const docRef = await addDoc(collection(db, 'volunteers'), data);
        console.log("✅ Document written with ID:", docRef.id);
    } catch (e) {
        console.error("❌ Error adding document:", e);
    }
}