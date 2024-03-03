import React, { useContext, useState } from 'react';
import { MoviesContext } from '../App';
import { Grid, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';
import defaultTVShowImg from '/default-image.jpg'; // Update the import path
import Popup from './Popup'; // Import the Popup component

const TVShowList = () => {
    const { tvShows } = useContext(MoviesContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const handleOpenPopup = (item) => {
        setSelectedItem(item);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const imgUrl = 'https://image.tmdb.org/t/p/w500';

    const renderTVShowCard = (item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id} onClick={() => handleOpenPopup(item)}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component='img'
                    image={item.poster_path ? `${imgUrl}${item.poster_path}` : defaultTVShowImg}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' component='div'>
                        {item.name}
                    </Typography>
                    <Typography variant='body2'>
                        {item.overview || 'TV show overview coming soon...'}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Total votes: {item.vote_count}</Typography>
                    <Typography variant='body2'>{item.first_air_date}</Typography>
                    <Typography variant='body2'>{item.original_language.toUpperCase()}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            {tvShows.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        No TV shows found!
                    </Typography>
                </Grid>
            ) : tvShows.map(renderTVShowCard)}
            <Popup open={openPopup} handleClose={handleClosePopup} item={selectedItem} />
        </Grid>
    );
};

export default TVShowList;
