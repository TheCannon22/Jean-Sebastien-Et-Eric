import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { lireTout } from "../code/dossier-modele";

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
        <button onClick={afficherComicPrecedent}>Précédent</button>
        <button onClick={afficherComicSuivant}>Suivant</button>
      </div>
    </div>
  );
}
