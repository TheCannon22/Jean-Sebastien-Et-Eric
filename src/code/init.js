import objetConfig from './config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const appli = initializeApp(objetConfig);

export const firebaseAuth = getAuth(appli);

export const googleProvider = new GoogleAuthProvider();

export const bd = getFirestore(appli);

export const collectionUtilisateurs = "jse-utilisateurs";
export const collectionBandes = "jse-bandes";