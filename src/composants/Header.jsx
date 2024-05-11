import "./Header.scss";
import React from "react";
import "./Header";
import Avatar from "@mui/material/Avatar";
import { connexion } from "../code/utilisateur-modele";
import { deconnexion } from "../code/utilisateur-modele";

function Header() {
  return (
    <div className="Header">
      <img
        src="../src/images/amoi_logo.png"
        alt="logo_a_moi"
        width={160}
        height={70}
      />
      
      <div className="connexion-complete">
        <div className="btn-google" onClick={connexion} >
          <img src="" alt="" />
          Connexion avec Google
        
        </div>
        <Avatar className="avatar" />
        <button onClick={deconnexion}>Déconnexion</button>
      </div>
    </div>
  );
}

export default Header;
