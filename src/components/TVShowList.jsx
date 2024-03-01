import React, { useContext } from 'react';
import { MoviesContext } from '../App';
import { Grid, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';
import defaultMovieImg from '/default-image.jpg';

const TVShowList = () => {
    let imgUrl = 'https://image.tmdb.org/t/p/w500';
    const { tvShows } = useContext(MoviesContext);

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {tvShows.length === 0 ? (
                <div className='no-data-msg'>
                    <p>No TV shows found!</p>
                </div>
            ) : (
                tvShows.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component='img'
                                image={
                                    item.poster_path == null
                                        ? defaultTVShowImg
                                        : `${imgUrl}${item.poster_path}`
                                }
                                alt={item.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant='h6' component='div'>
                                    {item.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {item.overview ? item.overview : 'TV show overview coming soon...'}
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
                ))
            )}
        </Grid>
    );
};

export default TVShowList;
