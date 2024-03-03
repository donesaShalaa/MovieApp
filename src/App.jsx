import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import TVShowList from './components/TVShowList';
import Popup from './components/Popup'; // Import the Popup component

const MoviesContext = createContext();
export { MoviesContext };

function App() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    const [movieFetchUrl, setMovieFetchUrl] = useState(
        `${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`
    );
    const [tvShowFetchUrl, setTVShowFetchUrl] = useState(
        `${import.meta.env.VITE_API_BASE_URL}/tv/popular?api_key=${import.meta.env.VITE_API_KEY}`
    );
    const [movieSearch, setMovieSearch] = useState('');
    const [tvShowSearch, setTVShowSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        function fetchMovies() {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
                .then((response) => response.json())
                .then((genreData) => {
                    fetch(movieFetchUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            const movieResults = data.results.map((movie) => {
                                const genres = movie.genre_ids.map((genreId) =>
                                    genreData.genres.find((genre) => genre.id === genreId)
                                );
                                return {
                                    ...movie,
                                    genres,
                                };
                            });
                            setMovies(movieResults);
                        })
                        .catch((error) => console.error('Error fetching movies:', error));
                })
                .catch((error) => console.error('Error fetching genres:', error));
        }

        function fetchTVShows() {
            fetch(tvShowFetchUrl)
                .then((response) => response.json())
                .then((data) => setTVShows(data.results))
                .catch((error) => console.error('Error fetching TV shows:', error));
        }

        fetchMovies();
        fetchTVShows();
    }, [movieFetchUrl, tvShowFetchUrl]);

    const searchMovies = (query) => {
        const movieUrl = `${import.meta.env.VITE_API_BASE_URL}/search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`;

        setMovieFetchUrl(movieUrl);
        setMovieSearch(query);
    };

    const searchTVShows = (query) => {
        const tvShowUrl = `${import.meta.env.VITE_API_BASE_URL}/search/tv?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`;

        setTVShowFetchUrl(tvShowUrl);
        setTVShowSearch(query);
    };

    const clearSearch = () => {
        setMovieFetchUrl(
            `${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`
        );
        setTVShowFetchUrl(
            `${import.meta.env.VITE_API_BASE_URL}/tv/popular?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setMovieSearch('');
        setTVShowSearch('');
    };

    const handleOpenPopup = (item) => {
        setSelectedItem(item);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    return (
        <MoviesContext.Provider
            value={{
                movies,
                tvShows,
                searchMovies,
                searchTVShows,
                movieSearch,
                tvShowSearch,
                clearSearch,
            }}
        >
            <BrowserRouter>
                <Header clearSearch={clearSearch} />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movies" element={<MovieList handleOpenPopup={handleOpenPopup} />} />
                    <Route path="/tvshows" element={<TVShowList handleOpenPopup={handleOpenPopup} />} />
                </Routes>
                <Popup open={openPopup} handleClose={handleClosePopup} item={selectedItem} />
            </BrowserRouter>
        </MoviesContext.Provider>
    );
}

export default App;
