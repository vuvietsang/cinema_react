import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Chip } from '@material-ui/core';
Genres.propTypes = {

};

function Genres(props) {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPage(1);
    }
    const handleRemove = (genre) => {
        setGenres([...genres, genre]);
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id))
        setPage(1);
    }

    const { type, selectedGenres, setSelectedGenres, genres, setGenres, setPage } = props;
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`)
        setGenres(data.genres);
        console.log(data.genres);
    }
    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({})
        }
    }, [])

    return (
        <div style={{ padding: '6px 0' }}>
            {
                selectedGenres.map((genre) => (
                    <Chip label={genre.name} style={{ margin: '2', backgroundColor: 'skyblue' }} clickable key={genre.id} onDelete={() => handleRemove(genre)}  >
                    </Chip>
                ))
            }
            {
                genres.map((genre) => (
                    <Chip label={genre.name} style={{ margin: '2' }} clickable key={genre.id} onClick={() => handleAdd(genre)} >
                    </Chip>
                ))
            }
        </div>
    );
}

export default Genres;