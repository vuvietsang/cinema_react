import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './styles.scss';
const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ media_type, id }) => {

    const [credits, setCredits] = useState();

    const fetchApi = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=820aa294ec54d4977d1175d2322285b2&language=en-US`)
        setCredits(data.cast);
    }
    useEffect(() => {
        fetchApi();
    }, [])
    const items = credits?.map((c) => (
        <div className='carouselItem'>
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                onDragStart={handleDragStart}
                alt={c?.name}
                className='carouselImg'
            />
            <b className='carouselItem_txt'>{c?.name}</b>
        </div>
    ));
    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7
        }
    }
    return (
        <AliceCarousel autoPlay responsive={responsive} disableButtonsControls mouseTracking disableDotsControls items={items} />
    );
}
export default Carousel;