import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { lireTout } from "../code/dossier-modele";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SectionDesComics() {
  const [toutesLesBandes, setToutesLesBandes] = useState([]);
  const [indexBandeQuotidienne, setIndexBandeQuotidienne] = useState(0);

  useEffect(() => {
    async function chargerBandes() {
      try {
        const bandes = await lireTout("idUtil");
        bandes.sort((a, b) => b.dpub - a.dpub);
        setToutesLesBandes(bandes);
      } catch (error) {
        console.log("Erreur lors du chargement des bandes:", error);
      }
    }

    chargerBandes();
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

  if (toutesLesBandes.length === 0) {
    return <div>Loading...</div>;
  }

  const bandeQuotidienne = toutesLesBandes[indexBandeQuotidienne];

  return (
    <div className="SectionDesComics">
      <h1>Les comics</h1>
      <div className="DetailsComic">
        <img src={bandeQuotidienne.url} alt={bandeQuotidienne.title} />
        <h2>{bandeQuotidienne.title}</h2>
        <p>{bandeQuotidienne.description}</p>
        <div className="enRange">
          <p>
            <FavoriteIcon fontSize="large" />{" "}
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
      </div>
    </div>
  );
}
