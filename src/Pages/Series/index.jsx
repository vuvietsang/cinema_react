import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomPagination from '../../components/Pagination';
import useGenre from '../../hooks/useGenre';
import Genres from '../../components/SingleContent/Genre';
import SingleContent from '../../components/SingleContent';
import axios from 'axios';

Series.propTypes = {

};

function Series(props) {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([])

    const genreURL = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`)
        setContent(data.results);
        setNumOfPages(data.total_pages)
    }
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreURL])
    return (
        <div>
            <span className='pageTile'>Series</span>
            <Genres type='movie'
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage} />
            <div className='trending'>
                {content && content.map((c) => (
                    <SingleContent key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.realease_date}
                        media_type='tv'
                        vote_average={c.vote_average}
                    />
                ))}
            </div>
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </div>
    );
}

export default Series;