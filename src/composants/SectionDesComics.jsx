import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc, query, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { bd, collectionBandes } from "../code/init";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { observerEtatConnexion } from "../code/utilisateur-modele";
import SectionDesCommentaires from "./SectionDesCommentaires";

export default function SectionDesComics() {
  const [toutesLesBandes, setToutesLesBandes] = useState([]);
  const [indexBandeQuotidienne, setIndexBandeQuotidienne] = useState(0);
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(bd, collectionBandes)), (snapshot) => {
      const bandes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      bandes.sort((a, b) => b.dpub - a.dpub);
      setToutesLesBandes(bandes);
    });

    observerEtatConnexion(setUtilisateur);

    return () => unsubscribe();
  }, []);

  function afficherBande(index) {
    setIndexBandeQuotidienne(index);
  }

  function afficherBandePrecedente() {
    setIndexBandeQuotidienne((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  }

  function afficherBandeSuivante() {
    setIndexBandeQuotidienne((prevIndex) => {
      if (prevIndex < toutesLesBandes.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  }

  function afficherPremiereBande() {
    afficherBande(0);
  }

  function afficherDerniereBande() {
    afficherBande(toutesLesBandes.length - 1);
  }

  async function gererAimer() {
    const bande = toutesLesBandes[indexBandeQuotidienne];
    const refBande = doc(bd, collectionBandes, bande.id);

    if (bande.aime && bande.aime.includes(utilisateur.uid)) {
      await updateDoc(refBande, {
        aime: arrayRemove(utilisateur.uid)
      });
    } else {
      await updateDoc(refBande, {
        aime: arrayUnion(utilisateur.uid)
      });
    }
  }

  if (toutesLesBandes.length === 0) {
    return <div>Loading...</div>;
  }

  const bandeQuotidienne = toutesLesBandes[indexBandeQuotidienne];
  const aimeParUtilisateur = bandeQuotidienne.aime && bandeQuotidienne.aime.includes(utilisateur?.uid);

  return (
    <div className="SectionDesComics">
      <h1>Les comics</h1>
      <div className="DetailsComic">
        <img src={bandeQuotidienne.url} alt={bandeQuotidienne.title} />
        <h2>{bandeQuotidienne.title}</h2>
        <p>{bandeQuotidienne.description}</p>
        <div className="enRange">
          <p>
            <FavoriteIcon
              fontSize="large"
              style={{ color: aimeParUtilisateur ? "red" : "grey" }}
              onClick={gererAimer}
            />{" "}
            {bandeQuotidienne.aime ? bandeQuotidienne.aime.length : 0}
          </p>
          <div className="NavigationBande">
            <button onClick={afficherPremiereBande}>Première</button>
            <button onClick={afficherBandePrecedente}>Précédente</button>
            <button onClick={afficherBandeSuivante}>Suivante</button>
            <button onClick={afficherDerniereBande}>Dernière</button>
          </div>
          <p>Date: {bandeQuotidienne.dpub}</p>
        </div>
        <SectionDesCommentaires idBande={bandeQuotidienne.id} />
      </div>
    </div>
  );
}
