import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const JOBS_COLLECTION = 'jobs';

export const jobsService = {
  async createJob(jobData: any) {
    try {
      const docRef = await addDoc(collection(db, JOBS_COLLECTION), jobData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  }
}; 