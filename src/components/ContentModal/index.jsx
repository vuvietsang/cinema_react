import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './styles.scss';
import axios from 'axios';
import { img_500, unavailable } from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from '../Carousel/index'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '90%',
        height: '80%',
        backgroundColor: '#39445a',
        border: '1px solid #282c34',
        boxShadow: theme.shadows[5],
        color: 'white',
        padding: theme.spacing(1, 3, 3),
        borderRadius: 10,
    },
}));

export default function ContentModal({ children, media_type, id }) {
    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key);
    }
    useEffect(() => {
        fetchData();
        fetchVideo();
    }, [])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [content, setContent] = useState([]);

    const [video, setVideo] = useState();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div type="button" className='media' onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content &&
                        <div className={classes.paper}>
                            <div className='ContentModal'>
                                <img className='content_portrait' src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />
                                <img className='contentmodal_landscape' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable} alt={content.name || content.title} />
                                <div className='ContentModel_about'>
                                    <span className='ContentModel_title'>
                                        {content.name || content.title}(
                                            {(
                                            content.first_air_date ||
                                            content.realease_date ||
                                            "------"
                                        ).substring(0, 4)}
                                        )
                                </span>
                                    {
                                        content.tagline && (<i className='tagline'>{content.tagline}</i>)
                                    }
                                    <span className='ContentModal_description'>{content.overview}</span>
                                    <div>
                                        < Carousel media_type={media_type} id={id} />
                                    </div>
                                    <Button
                                        variant='contained'
                                        startIcon={<YouTubeIcon />}
                                        color='secondary'
                                        target='__blank'
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    > Trailer</Button>
                                </div>
                            </div>
                        </div>
                    }
                </Fade>
            </Modal>
        </div>
    );
}