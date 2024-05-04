import './FlechesPourChangerLesComics.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FirstPageIcon from '@mui/icons-material/FirstPage';

function FlechesPourChangerLesComics() {
    return (
        <div className='FlechesPourChangerLesComics'>
            <FirstPageIcon fontSize='large' />
            <ArrowBackIosNewIcon fontSize='large' />
            <ArrowForwardIosIcon fontSize='large' />
            <LastPageIcon fontSize='large' />
        </div>
    );
}

export default FlechesPourChangerLesComics;