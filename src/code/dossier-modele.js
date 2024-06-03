/**
 * ajoute un dossier pour l'utilisateur connecté dans Firestore
 * @param {string} idUtil Identifiant de l'utilisateur
 * @param {object} infoDossier Objet contenant les informations du dossier à ajouter
 *
 * @returns {Promise<String>} Identifiant du dossier ajouté
 */

import {
  collection,
  getDocs,
  query,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { bd, collectionUtilisateurs, collectionBandes } from "./init";

export async function creer(idUtil, infoDossier) {
  const refDossier = doc(
    collection(bd, collectionUtilisateurs, idUtil, collectionBandes)
  );
  console.log("Réference de document nouveau:", refDossier);
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}

/**
 * Lire *TOUTE* l'info des dossiers de l'utilisateur connecté
 *
 * @param {string} idUtil Identifiant de l'utilisateur
 *
 * @returns {Promise<array>} Tableau contenant tous les dossiers de cet utilisateur
 */

export async function lireTout(idUtil) {
  const lesDossiers = await getDocs(query(collection(bd, collectionBandes)));
  console.log(
    "Snapshot contenant les documents dans Firestore: ",
    lesDossiers.docs
  );
  return lesDossiers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

/**
 *
 * @param {*} idUtil
 * @param {*} idBandes
 */
export async function supprimer(idUtil, idBandes) {
  const refDossier = doc(
    bd,
    collectionUtilisateurs,
    idUtil,
    collectionBandes,
    idBandes
  );
  await deleteDoc(refDossier);
}

/**
 *
 * @param {*} idUtil
 * @param {*} idBandes
 * @param {*} infoDossier
 */
export async function modifier(idUtil, idBandes, infoDossier) {
  const refDossier = doc(
    bd,
    collectionUtilisateurs,
    idUtil,
    collectionBandes,
    idBandes
  );
  await updateDoc(refDossier, infoDossier);
}

//SectionDesComics.jsx
