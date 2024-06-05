import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { lireTout, aimerBande, desaimBande } from "../code/dossier-modele";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { observerEtatConnexion } from "../code/utilisateur-modele";

export default function SectionDesComics() {
  const [toutesLesBandes, setToutesLesBandes] = useState([]);
  const [indexBandeQuotidienne, setIndexBandeQuotidienne] = useState(0);
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    async function chargerBandes() {
      try {
        const bandes = await lireTout();
        bandes.sort((a, b) => b.dpub - a.dpub);
        setToutesLesBandes(bandes);
      } catch (error) {
        console.log("Erreur lors du chargement des bandes:", error);
      }
    }

    chargerBandes();
    observerEtatConnexion(setUtilisateur);
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
    if (bande.aime && bande.aime.includes(utilisateur.uid)) {
      await desaimBande(bande.id, utilisateur.uid);
      bande.aime = bande.aime.filter((id) => id !== utilisateur.uid);
    } else {
      await aimerBande(bande.id, utilisateur.uid);
      if (bande.aime) {
        bande.aime.push(utilisateur.uid);
      } else {
        bande.aime = [utilisateur.uid];
      }
    }
    setToutesLesBandes([...toutesLesBandes]);
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
        <div></div>
      </div>
    </div>
  );
}
