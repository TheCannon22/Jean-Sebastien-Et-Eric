import './Appli.scss';
import Header from './Header';
import Footer from './Footer';
import SectionDesComics from './SectionDesComics';
import FlechesPourChangerLesComics from './FlechesPourChangerLesComics';
import SectionDesLikesDeLutilisateur from './SectionDesLikesDeLutilisateur';
import SectionDesCommentaires from './SectionDesCommentaires';

function Appli() {

  return (
    <div className="Appli">
      <Header/>
      <SectionDesComics/>
      <SectionDesLikesDeLutilisateur/>
      <FlechesPourChangerLesComics/>
      <SectionDesCommentaires/>
      <Footer/>
    </div>
  )
}

export default Appli;