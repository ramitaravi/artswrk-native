import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, UserRole } from '@/types/user';

// Collection reference
const usersCollection = collection(db, 'users');

// Helper function to create a new user
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'modifiedAt' | 'fullName'>): Promise<User> {
  const now = new Date();
  const newUser: User = {
    ...userData,
    id: doc(usersCollection).id, // Generate a new Firestore ID
    fullName: `${userData.firstName} ${userData.lastName}`.trim(),
    createdAt: now,
    modifiedAt: now,
  };

  await setDoc(doc(usersCollection, newUser.id), {
    ...newUser,
    createdAt: now.toISOString(),
    modifiedAt: now.toISOString(),
  });

  return newUser;
}

// Helper function to get a user by ID
export async function getUserById(id: string): Promise<User | null> {
  const userDoc = await getDoc(doc(usersCollection, id));
  
  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    modifiedAt: new Date(data.modifiedAt),
  } as User;
}

// Helper function to get a user by slug
export async function getUserBySlug(slug: string): Promise<User | null> {
  const q = query(usersCollection, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const data = querySnapshot.docs[0].data();
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    modifiedAt: new Date(data.modifiedAt),
  } as User;
}

// Helper function to generate a unique slug
export async function generateUniqueSlug(firstName: string, lastName: string): Promise<string> {
  const baseSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-');
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingUser = await getUserBySlug(slug);
    if (!existingUser) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
} 