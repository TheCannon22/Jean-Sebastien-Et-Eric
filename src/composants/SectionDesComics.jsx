import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { lireTout } from "../code/dossier-modele";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FirstPageIcon from "@mui/icons-material/FirstPage";

export default function SectionDesComics() {
  const [tousLesComics, setTousLesComics] = useState([]);
  const [comicSelectionne, setComicSelectionne] = useState(0);

  useEffect(() => {
    async function chercherComics() {
      try {
        const data = await lireTout("idUtil"); // Pass the user ID here
        setTousLesComics(data);
        console.log("Data fetched successfully: ", data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    chercherComics();
  }, []);

  function afficherDetailsComic(comicIndex) {
    setComicSelectionne(comicIndex);
  }

  function afficherComicSuivant() {
    setComicSelectionne((comicSelectionne + 1) % tousLesComics.length);
  }

  function afficherComicPrecedent() {
    setComicSelectionne(
      (comicSelectionne - 1 + tousLesComics.length) % tousLesComics.length
    );
  }

  if (tousLesComics.length === 0) {
    return <div>Loading...</div>;
  }

  const comicSelectionneData = tousLesComics[comicSelectionne];

  if (!comicSelectionneData) {
    return <div>Error: Invalid comic selectionne index.</div>;
  }

  return (
    <div className="SectionDesComics">
      <h1>Les comics</h1>
      <div className="DetailsComic">
        <img src={comicSelectionneData.url} alt={comicSelectionneData.title} />
        <h2>{comicSelectionneData.title}</h2>
        <p>{comicSelectionneData.description}</p>
        <p>Likes: {comicSelectionneData.likes}</p>
        <p>Comments: {comicSelectionneData.comments}</p>
        <p>Date: {comicSelectionneData.date}</p>

        <div className="FlechesPourChangerLesComics">
          <FirstPageIcon className="styleFleche1" fontSize="large" />
          <ArrowBackIosNewIcon
            className="styleFleche2"
            fontSize="large"
            onClick={afficherComicPrecedent}
          />
          <ArrowForwardIosIcon
            className="styleFleche2"
            fontSize="large"
            onClick={afficherComicSuivant}
          />
          <LastPageIcon className="styleFleche1" fontSize="large" />
        </div>
      </div>
    </div>
  );
}
