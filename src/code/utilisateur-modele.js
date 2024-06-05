import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  bd,
  collectionUtilisateurs,
  firebaseAuth,
  googleProvider,
} from "./init";
import { doc, setDoc } from "firebase/firestore";

export function connexion() {
  signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      // La connexion réussit, vous pouvez traiter le résultat ici
      // Par exemple, rediriger l'utilisateur vers une autre page
      console.log("Connexion réussie :", result);
    })
    .catch((error) => {
      // La connexion a échoué, gérer l'erreur ici
      console.error("Erreur de connexion :", error);
    });
}

export function deconnexion() {
  signOut(firebaseAuth)
    .then(() => {
      // Déconnexion réussie
      console.log("Déconnexion réussie");
    })
    .catch((error) => {
      // La déconnexion a échoué, gérer l'erreur ici
      console.error("Erreur de déconnexion :", error);
    });
}


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
