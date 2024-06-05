import {
  collection,
  getDocs,
  query,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { bd, collectionBandes } from "./init";
import { addDoc, serverTimestamp } from "firebase/firestore";

export async function creer(idUtil, infoDossier) {
  const refDossier = doc(collection(bd, collectionBandes));
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}

export async function lireTout() {
  const lesDossiers = await getDocs(query(collection(bd, collectionBandes)));
  return lesDossiers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function supprimer(idBandes) {
  const refDossier = doc(bd, collectionBandes, idBandes);
  await deleteDoc(refDossier);
}

export async function modifier(idBandes, infoDossier) {
  const refDossier = doc(bd, collectionBandes, idBandes);
  await updateDoc(refDossier, infoDossier);
}

export async function aimerBande(idBande, idUtil) {
  const refBande = doc(bd, collectionBandes, idBande);
  await updateDoc(refBande, {
    aime: arrayUnion(idUtil),
  });
}

export async function desaimBande(idBande, idUtil) {
  const refBande = doc(bd, collectionBandes, idBande);
  await updateDoc(refBande, {
    aime: arrayRemove(idUtil),
  });
}

export async function lireCommentaires(idBande) {
  const refCommentaires = collection(bd, collectionBandes, idBande, 'commentaires');
  const snapshot = await getDocs(query(refCommentaires));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

export async function ajouterCommentaire(idBande, commentaire) {
  try {
    const commentairesRef = collection(bd, `${collectionBandes}/${idBande}/commentaires`);
    await addDoc(commentairesRef, {
      texte: commentaire.texte,
      nomUtil: commentaire.nomUtil,
      idUtil: commentaire.idUtil,
      timestamp: serverTimestamp(),
      votes: commentaire.votes ? commentaire.votes : {},
    });
    console.log("Commentaire ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
  }
}
