import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { img_300, unavailable } from '../../config/config';
import { Badge } from '@material-ui/core';
import ContentModal from '../ContentModal';
SingleContent.propTypes = {

};

function SingleContent(props) {
    const { id, poster, title, date, media_type, vote_average } = props;
    return (
        <ContentModal media_type={media_type} id={id}>

            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className='title'>{title}</b>
            <span className='subTitle'>
                {media_type === 'tv' ? "TV Series" : "Movie"}
                <span>
                    {date}
                </span>
            </span>

        </ContentModal>
    );
}

export default SingleContent;