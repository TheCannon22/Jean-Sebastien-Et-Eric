import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  bd,
  collectionUtilisateurs,
  firebaseAuth,
  googleProvider,
} from "./init";
import { doc, setDoc } from "firebase/firestore";

export function connexion() {
  signInWithPopup(firebaseAuth, googleProvider);
  // Toast.style.animationPlayState = "running";
}

export function deconnexion() {
  signOut(firebaseAuth);
}
console.log(firebaseAuth);

export function observerEtatConnexion(mutateurUtilisateur) {
  onAuthStateChanged(firebaseAuth, (u) => {
    if (u) {
      setDoc(
        doc(bd, collectionUtilisateurs, u.uid),
        {
          nom: u.displayName,
          avatar: u.photoURL,
          courriel: u.email,
        },
        { merge: true }
      );
    }

    mutateurUtilisateur(u);
  });
}
