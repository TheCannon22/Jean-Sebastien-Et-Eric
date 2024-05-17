import "./FlechesPourChangerLesComics.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FirstPageIcon from "@mui/icons-material/FirstPage";

function FlechesPourChangerLesComics() {
  return (
    <div className="FlechesPourChangerLesComics">
      <FirstPageIcon className="styleFleche1" fontSize="large" />
      <ArrowBackIosNewIcon className="styleFleche2" fontSize="large" />
      <ArrowForwardIosIcon className="styleFleche2" fontSize="large" />
      <LastPageIcon className="styleFleche1" fontSize="large" />
    </div>
  );
}

export default FlechesPourChangerLesComics;
