import "./SectionHero.scss";
import React from "react";

function SectionHero() {
  return (
    <div className="SectionHero">
      <div className="sectionTexte">
        <h1>JEAN-SÉBASTIEN ET ÉRIC</h1>
        <h2>Voir les publications →</h2>
      </div>
      <div className="contenantImage">
        <img src="../src/images/hero-jean-seb-eric.png" alt="seb_et_eric" />
      </div>
      <h2 className="leNumero">#1</h2>
    </div>
  );
}

export default SectionHero;
