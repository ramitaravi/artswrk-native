import { db, storage } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { generateUniqueSlug } from './users';

export interface ClientProfile extends User {
  companyName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  profileImageUrl?: string;
}

export async function createClientProfile(data: OnboardingFormData): Promise<ClientProfile> {
  try {
    // Upload profile image if exists
    let profileImageUrl;
    if (data.profileImage) {
      const storageRef = ref(storage, `profile-images/${Date.now()}-${data.profileImage.name}`);
      await uploadBytes(storageRef, data.profileImage);
      profileImageUrl = await getDownloadURL(storageRef);
    }

    // Generate slug from name
    const slug = await generateUniqueSlug(data.firstName, data.lastName);

    // Create user profile
    const clientProfile: ClientProfile = {
      id: doc(collection(db, 'users')).id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: 'client',
      slug,
      createdAt: new Date(),
      modifiedAt: new Date(),
      companyName: data.companyName,
      industry: data.industry,
      companySize: data.companySize,
      website: data.website,
      profileImageUrl,
      phone: data.phone,
      location: data.location,
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', clientProfile.id), clientProfile);

    return clientProfile;
  } catch (error) {
    console.error('Error creating client profile:', error);
    throw error;
  }
} 