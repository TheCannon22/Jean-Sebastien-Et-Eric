import { useState, useEffect } from "react";
import {
  connexion,
  deconnexion,
  observerEtatConnexion,
} from "../code/utilisateur-modele";
import "./Toast.scss";

function Toast() {
  const [animationPlayState, setAnimationPlayState] = useState("running");
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    if (connexion) {
      // setAnimationPlayState("running");
      observerEtatConnexion(setUtilisateur);

      console.log("Message de Connexion");
    } else if (deconnexion) {
      console.log("Message de Déconnexion");
    }
  }, []);

  return (
    <div className="Toast" style={{ animationPlayState }} id="theFirstToast">
      <img
        src="../src/images/logo_seul.png"
        alt="logo_amoi"
        width={100}
        height={72}
      />
      <p>Veuillez vous connecter.</p>
    </div>
  );
}

export function Toast2() {
  const [animationPlayState, setAnimationPlayState] = useState("paused");

  return (
    <div className="Toast" style={{ animationPlayState }} id="theSecondToast">
      <img
        src="../src/images/logo_seul.png"
        alt="logo_amoi"
        width={100}
        height={72}
      />
      <p>Vous êtes déconnecté.</p>
    </div>
  );
}

export default Toast;
