import "./Appli.scss";
import Header from "./Header";
import Footer from "./Footer";
import SectionDesComics from "./SectionDesComics";
import SectionHero from "./SectionHero";
import FlechesPourChangerLesComics from "./FlechesPourChangerLesComics";
import SectionDesLikesDeLutilisateur from "./SectionDesLikesDeLutilisateur";
import SectionDesCommentaires from "./SectionDesCommentaires";
import Toast from "./Toast";

function Appli() {
  return (
    <div className="Appli">
      <Toast />
      <Header />
      <SectionHero />
      <SectionDesComics />
      <SectionDesLikesDeLutilisateur />
      <SectionDesCommentaires />
      <Footer />
    </div>
  );
}

export default Appli;
