import "./Appli.scss";
import Header from "./Header";
import Footer from "./Footer";
import SectionDesComics from "./SectionDesComics";
import SectionHero from "./SectionHero";
import FlechesPourChangerLesComics from "./FlechesPourChangerLesComics";
import SectionDesLikesDeLutilisateur from "./SectionDesLikesDeLutilisateur";
import SectionDesCommentaires from "./SectionDesCommentaires";

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

function Appli() {
  return (
    <div className="Appli">
      <Header />
      <SectionHero />
      <SectionDesComics />
      <SectionDesLikesDeLutilisateur />
      <FlechesPourChangerLesComics />
      <SectionDesCommentaires />
      <Footer />
    </div>
  );
}

export default Appli;
