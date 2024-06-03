import "./SectionDesComics.scss";
import React, { useEffect, useState } from "react";
import { lireTout } from "../code/dossier-modele";

export default function SectionDesComics() {
  const [tousLesComics, setTousLesComics] = useState([]);

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

  return (
    <div className="SectionDesComics">
      <h1>Les comics</h1>
      {tousLesComics.map((comic) => (
        <img src={comic.url} alt={comic.title} key={comic.id} />
      ))}
    </div>
  );
}
