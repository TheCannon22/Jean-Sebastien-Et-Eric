import './Header.scss';
import React from 'react';
import './Header';
import Avatar from '@mui/material/Avatar';

function Header() {
    return (
        <div className='Header'>
            <h1>TP2 - React</h1>
            <Avatar className='avatar' />
        </div>
    );
}

export default Header;