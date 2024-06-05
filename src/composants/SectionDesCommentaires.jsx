import React, { useEffect, useState } from "react";
import { lireCommentaires, supprimerCommentaire } from "../code/dossier-modele";
import "./SectionDesCommentaires.scss";
import { Timestamp } from "firebase/firestore";
import { ajouterCommentaire } from "../code/dossier-modele";
import { observerEtatConnexion } from "../code/utilisateur-modele";

function SectionDesCommentaires({ idBande }) {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nouveauCommentaire.trim() !== "") {
      const commentaire = {
        texte: nouveauCommentaire,
        nomUtil: utilisateur.displayName,
        idUtil: "idUtilisateur",
      };
      await ajouterCommentaire(idBande, commentaire);
      setNouveauCommentaire("");
    }
  };

  const handleSupprimerCommentaire = async (idCommentaire) => {
    await supprimerCommentaire(idBande, idCommentaire);
  };

  useEffect(() => {
    async function chargerCommentaires() {
      try {
        const commentaires = await lireCommentaires(idBande);
        commentaires.sort((a, b) => {
          const timestampA =
            a.timestamp instanceof Timestamp
              ? a.timestamp
              : Timestamp.fromDate(new Date(a.timestamp));
          const timestampB =
            b.timestamp instanceof Timestamp
              ? b.timestamp
              : Timestamp.fromDate(new Date(b.timestamp));
          return timestampB - timestampA;
        });
        setCommentaires(commentaires);
      } catch (error) {
        console.log("Erreur lors du chargement des commentaires:", error);
      }
    }

    if (idBande) {
      chargerCommentaires();
    }
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
            <button onClick={() => handleSupprimerCommentaire(commentaire.id)}>
              Supprimer
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default SectionDesCommentaires;
