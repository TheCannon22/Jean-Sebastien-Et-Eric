import React, { useEffect, useState } from "react";
import { lireCommentaires } from "../code/dossier-modele";
import "./SectionDesCommentaires.scss";
import { Timestamp } from "firebase/firestore";
import { ajouterCommentaire } from "../code/dossier-modele";

function SectionDesCommentaires({ idBande }) {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nouveauCommentaire.trim() !== "") {
      const commentaire = {
        texte: nouveauCommentaire,
        nomUtil: "Nom Utilisateur", // Remplacer par le nom de l'utilisateur connecté
        idUtil: "idUtilisateur", // Remplacer par l'identifiant de l'utilisateur connecté
      };
      await ajouterCommentaire(idBande, commentaire);
      setNouveauCommentaire("");
    }
  };

  useEffect(() => {
    async function chargerCommentaires() {
      try {
        const commentaires = await lireCommentaires(idBande);
        commentaires.sort((a, b) => {
          const timestampA = a.timestamp instanceof Timestamp ? a.timestamp : Timestamp.fromDate(new Date(a.timestamp));
          const timestampB = b.timestamp instanceof Timestamp ? b.timestamp : Timestamp.fromDate(new Date(b.timestamp));
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
            <strong>{commentaire.nomUtil}</strong> ({new Date(commentaire.timestamp instanceof Timestamp ? commentaire.timestamp.toMillis() : commentaire.timestamp).toLocaleString()})
          </p>
          <p>{commentaire.texte}</p>
        </div>
      ))}
    </div>
  );
}

export default SectionDesCommentaires;
