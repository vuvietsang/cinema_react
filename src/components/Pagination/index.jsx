import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

function CustomPagination({ setPage, numOfPages }) {
    const handlePagination = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10,
        }}>
            <ThemeProvider theme={darkTheme}>
                < Pagination hideNextButton hidePrevButton count={numOfPages ? numOfPages : 10} onChange={(e) => handlePagination(e.target.textContent)} />
            </ThemeProvider>
        </div>
    );
}

export default CustomPagination;