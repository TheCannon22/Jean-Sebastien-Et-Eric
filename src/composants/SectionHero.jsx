import { Button } from "@mui/material";
import "./SectionHero.scss";
import React from "react";

// Pour les couleurs, ceci est encore en phase test!
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[200],
      contrastText: "#000",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
    third: {
      main: "#fff",
      contrastText: "#000",
    },
  },
});

function SectionHero() {
  return (
    <div className="SectionHero">
      <div className="sectionTexte">
        <h1>JEAN-SÉBASTIEN ET ÉRIC</h1>
        <ThemeProvider theme={theme}>
          <Button
            className="publications"
            variant="contained"
            color="secondary"
          >
            Voir les publications →
          </Button>
        </ThemeProvider>
      </div>
      <div className="contenantImage">
        <img src="../src/images/hero-jean-seb-eric.png" alt="seb_et_eric" />
      </div>
      <h2 className="leNumero">#1</h2>
      {/* <h2 className="pourPubli">Voir les publications →</h2> */}
    </div>
  );
}

export default SectionHero;
