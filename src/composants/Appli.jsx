import "./Appli.scss";
import Header from "./Header";
import Footer from "./Footer";
import SectionDesComics from "./SectionDesComics";
import SectionHero from "./SectionHero";
import Toast from "./Toast";

function Appli() {
  return (
    <div className="Appli">
      <Toast />
      <Header />
      <SectionHero />
      <SectionDesComics />
      <Footer />
    </div>
  );
}

export default Appli;
