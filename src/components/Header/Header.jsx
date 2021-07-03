import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
Header.propTypes = {

};

function Header(props) {
    return (
        <div>
            <span onClick={() => window.scroll(0, 0)} className='header'>🎬 Galaxy Cinema 🎥</span>
        </div>
    );
}

export default Header;