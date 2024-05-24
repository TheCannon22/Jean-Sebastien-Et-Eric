import "./SectionDesComics.scss";
import React, { useEffect } from "react";
import { lireTout } from "../code/dossier-modele";

export default function SectionDesComics({ setComics }) {
  useEffect(() => {
    async function chercherComics() {
      try {
        // Chercher toutes les tâches dans Firestore
        const tousLesComics = await lireTout("userID"); // Pass the user ID here
        // Raffraîchir l'état React des tâches
        setComics(tousLesComics);
        console.log("Data fetched successfully: ", tousLesComics);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    chercherComics();
    console.log(chercherComics);
  }, [setComics]);

  return (
    <div className="SectionDesComics">
      <h1>Les comics</h1>
      <img src="/admin/jse-3.png" alt="" />
    </div>
  );
}
