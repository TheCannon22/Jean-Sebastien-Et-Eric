import "./Footer.scss";
import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <img
        src="../src/images/amoi_logo.png"
        alt="logo_a_moi"
        width={160}
        height={70}
      />
      <div className="contenantColonnes">
        <div className="premiereColonne toutesColonnes">
          <h3>À propos</h3>
          <p>
            Avec ses créations humoristiques, Dominic Gibeau est un étudiant du
            Collège de Maisonneuve, présentement aux études en technique
            d'intégration du multimédia. Le logo "À moi" appartient à l'étudiant
            qui, dans son temps libre, conçois des histoires pour tout les
            goûts!
          </p>
          <p>
            Dominic voulait que je rajoute "chu juste un cave qui fait du
            bruit"!
          </p>
        </div>
        <div className="deuxiemeColonne toutesColonnes">
          <h3>Contacts</h3>
          <p>email</p>
          <p>téléphone du walmart à côté de chez nous</p>
          <p>lieux de résidence vraiment weird</p>
          <p>calendrier ou lien portfolio idk</p>
        </div>
        <div className="troisiemeColonne toutesColonnes">
          <h3>Réseaux</h3>
          <p>instagram</p>
          <p>facebook</p>
          <p>twitter</p>
          <p>github ou autre ig</p>
        </div>
      </div>
      <p>
        Tous droits réservés à Dominic Gibeau, Alexander Rankov et Gabrielle
        Pelletier.
      </p>
    </div>
  );
}

export default Footer;
