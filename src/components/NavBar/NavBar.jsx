import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#2d313a',
        zIndex: 100,
    },
});

export default function SimpleBottomNavigation() {
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        if (value === 0) {
            history.push('/')
        }
        else if (value === 1) {
            history.push('/movies')
        }
        else if (value === 2) {
            history.push('/series')
        }
        else if (value === 3) {
            history.push('/search')
        }
    }, [value, history])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Hot" style={{ color: 'white' }} icon={<WhatshotIcon />} />
            <BottomNavigationAction label="Movies" style={{ color: 'white' }} icon={<MovieIcon />} />
            <BottomNavigationAction label="TVSeries" style={{ color: 'white' }} icon={<TvIcon />} />
            <BottomNavigationAction label="Search" style={{ color: 'white' }} icon={<SearchIcon />} />
        </BottomNavigation>
    );
}
