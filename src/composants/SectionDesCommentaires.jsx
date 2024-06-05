import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";
import { bd, collectionBandes } from "../code/init";
import "./SectionDesCommentaires.scss";
import { Timestamp } from "firebase/firestore";
import { ajouterCommentaire, supprimerCommentaire } from "../code/dossier-modele";
import { observerEtatConnexion } from "../code/utilisateur-modele";

function SectionDesCommentaires({ idBande }) {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  // Fonction pour ajouter un commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nouveauCommentaire.trim() !== "") {
      const commentaire = {
        texte: nouveauCommentaire,
        nomUtil: utilisateur.displayName,
        idUtil: utilisateur.uid, // Utiliser l'ID réel de l'utilisateur
      };
      await ajouterCommentaire(idBande, commentaire);
      setNouveauCommentaire("");
    }
  };

  // Fonction pour supprimer un commentaire
  const handleSupprimerCommentaire = async (idCommentaire) => {
    await supprimerCommentaire(idBande, idCommentaire);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(bd, `${collectionBandes}/${idBande}/commentaires`)), (snapshot) => {
      const newCommentaires = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentaires(newCommentaires);
    });

    return () => unsubscribe();
  }, [idBande]);

  return (
    <div className="SectionDesCommentaires">
      <h2>Commentaires</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={nouveauCommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
          placeholder="Ajouter un commentaire..."
        ></textarea>
        <button type="submit">Ajouter</button>
      </form>
      {commentaires.map((commentaire) => (
        <div key={commentaire.id} className="Commentaire">
          <p>
            <strong>{commentaire.nomUtil}</strong>: {commentaire.texte}
            {utilisateur && utilisateur.uid === commentaire.idUtil && (
              <button onClick={() => handleSupprimerCommentaire(commentaire.id)}>
                Supprimer
              </button>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SectionDesCommentaires;
