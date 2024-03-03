import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import defaultImage from '/default-image.jpg'; // Update the import path

const Popup = ({ open, handleClose, item }) => {
    if (!item) {
        return null;
    }

    const imgUrl = 'https://image.tmdb.org/t/p/w200'; // Adjust the size of the image

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{item.title || item.name}</DialogTitle>
            <DialogContent>
                <img
                    src={item.poster_path ? `${imgUrl}${item.poster_path}` : defaultImage}
                    alt={item.title || item.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Typography variant="body1">{item.overview}</Typography>
                <Typography variant="body2">
                    Release date: {item.release_date || item.first_air_date}
                </Typography>
                <Typography variant="body2">
                    Original language: {item.original_language.toUpperCase()}
                </Typography>
                {item.genres && (
                    <Typography variant="body2">
                        Genres: {item.genres.map((genre) => genre.name).join(', ')}
                    </Typography>
                )}
                <Typography variant="body2">Rating: {item.vote_average}/10</Typography>
                {/* Add more information here as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
