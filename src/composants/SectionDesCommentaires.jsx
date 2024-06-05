import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { bd, collectionBandes } from "../code/init";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { observerEtatConnexion } from "../code/utilisateur-modele";

export default function SectionDesCommentaires({ idBande }) {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nouveauCommentaire.trim() !== "") {
      try {
        const commentaire = {
          texte: nouveauCommentaire,
          nomUtil: utilisateur.displayName,
          idUtil: utilisateur.uid,
        };
        await ajouterCommentaire(commentaire);
        setNouveauCommentaire("");
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
      }
    }
  };

  const ajouterCommentaire = async (commentaire) => {
    try {
      await addDoc(collection(bd, `${collectionBandes}/${idBande}/commentaires`), {
        ...commentaire,
        timestamp: new Date(),
        votes: {} // Initialiser les votes à un objet vide
      });
      console.log("Commentaire ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  const handleSupprimerCommentaire = async (idCommentaire) => {
    try {
      await deleteDoc(doc(bd, `${collectionBandes}/${idBande}/commentaires/${idCommentaire}`));
      console.log("Commentaire supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  const handleVote = async (idCommentaire, voteType) => {
    if (!utilisateur) {
      // Si l'utilisateur n'est pas connecté, ne rien faire
      return;
    }

    try {
      const refCommentaire = doc(bd, `${collectionBandes}/${idBande}/commentaires/${idCommentaire}`);
      const commentaire = commentaires.find(commentaire => commentaire.id === idCommentaire);
      
      let votes = commentaire.votes || {};
      let voteValue = votes[utilisateur.uid] || 0;

      // Si l'utilisateur a déjà voté et que le nouveau vote est le même, annuler le vote
      if (voteValue === voteType) {
        delete votes[utilisateur.uid];
      } else {
        votes[utilisateur.uid] = voteType;
      }

      await updateDoc(refCommentaire, {
        votes: votes
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du vote :", error);
    }
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
            <button onClick={() => handleVote(commentaire.id, 1)}>
              <FavoriteIcon style={{ color: commentaire.votes && commentaire.votes[utilisateur?.uid] === 1 ? 'red' : 'grey' }} />
            </button>
            <span>{commentaire.votes ? Object.values(commentaire.votes).filter(vote => vote === 1).length : 0}</span>
            <button onClick={() => handleVote(commentaire.id, -1)}>
              <ThumbDownIcon style={{ color: commentaire.votes && commentaire.votes[utilisateur?.uid] === -1 ? 'blue' : 'grey' }} />
            </button>
            <span>{commentaire.votes ? Object.values(commentaire.votes).filter(vote => vote === -1).length : 0}</span>
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
