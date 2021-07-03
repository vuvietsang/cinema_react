import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent';
import CustomPagination from '../../components/Pagination';
Search.propTypes = {

};

function Search(props) {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();
    const handleChange = (event, newValue) => {
        setPage(1);
        setType(newValue);
    }
    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText ? searchText : " "}&page=${page}&include_adult=false`)

        setContent(data.results);
        console.log(content);
        setNumOfPages(data.total_pages);
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page])
    const darktheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: "#fff",
            },
        },
    })
    return (
        <div>
            <ThemeProvider theme={darktheme} >
                <div style={{ display: 'flex', margin: '15px 0' }}>
                    <TextField
                        style={{ flex: 1 }}
                        className='searchBox'
                        label='Search'
                        variant='filled'
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <Button endIcon={<SearchIcon />} variant='contained' style={{ marginLeft: 10 }} onClick={fetchSearch} ></Button>
                </div>

                <Tabs
                    value={type}
                    indicatorColor='primary'
                    textColor='primary' style={{ paddingBottom: 5 }}
                    onChange={handleChange}
                >
                    <Tab style={{ width: '50%' }} label="Search Moives" />
                    <Tab style={{ width: '50%' }} label="Search TV Series" />
                </Tabs>

            </ThemeProvider>

            <div className='trending'>
                {content && content.map((c) => (
                    <SingleContent key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.realease_date}
                        media_type={type === 0 ? 'movie' : 'tv'}
                        vote_average={c.vote_average}
                    />
                ))}
                {searchText && !content && (type ? <h2>No Series found</h2> : <h2>No Movies found</h2>)}
            </div>
            {numOfPages > 1 &&
                <CustomPagination numOfPages={numOfPages} setPage={setPage} />}
        </div>
    );
}

export default Search;