import "./Header.scss";
import React, { useState, useEffect } from "react";
import "./Header";
import Avatar from "@mui/material/Avatar";
import { connexion } from "../code/utilisateur-modele";
import { deconnexion, observerEtatConnexion } from "../code/utilisateur-modele";

function Header() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  return (
    <div className="Header">
      <img
        src="../src/images/amoi_logo.png"
        alt="logo_a_moi"
        width={160}
        height={70}
      />

      <div className="connexion-complete">
        {!utilisateur ? (
          <div className="btn-google" onClick={connexion}>
            <img src="" alt="" />
            Connexion avec Google
          </div>
        ) : (
          <></>
        )}
        {utilisateur ? (
          <>
            <Avatar className="avatar" src={utilisateur.photoURL} />
            <button onClick={deconnexion}>Déconnexion</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
