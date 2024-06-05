import React, { useEffect, useState } from "react";
import { lireCommentaires } from "../code/dossier-modele";
import "./SectionDesCommentaires.scss";
import { Timestamp } from "firebase/firestore";

function SectionDesCommentaires({ idBande }) {
  const [commentaires, setCommentaires] = useState([]);

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
