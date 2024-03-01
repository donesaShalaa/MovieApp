import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import TVShowList from './components/TVShowList';

const MoviesContext = createContext();
export { MoviesContext };

function App() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    const [fetchUrl, setFetchUrl] = useState(
        `${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`
    );
    const [search, setSearch] = useState('');

    useEffect(() => {
        function fetchMovies() {
            fetch(fetchUrl)
                .then((response) => response.json())
                .then((data) => setMovies(data.results))
                .catch((error) => console.error(error));
        }

        function fetchTVShows() {
            fetch('https://api.themoviedb.org/3/tv/popular?api_key=cb65f66704c9b22be001707cd648d7f3')
                .then((response) => response.json())
                .then((data) => setTVShows(data.results))
                .catch((error) => console.error('Error fetching TV shows:', error));
        }

        fetchMovies();
        fetchTVShows();
    }, [fetchUrl]);

    const getMovies = (movieType) => {
        let url;

        switch (movieType) {
            case 'Popular':
                url = `${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
                break;
            case 'Drama':
                url = `${import.meta.env.VITE_API_BASE_URL}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
                break;
            case 'Kids':
                url = `${import.meta.env.VITE_API_BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
                break;
            case 'Thriller':
                url = `${import.meta.env.VITE_API_BASE_URL}/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
                break;
        }

        setFetchUrl(url);
    };

    const searchMovies = (query) => {
        const movieUrl = `${import.meta.env.VITE_API_BASE_URL}/search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`;
        const tvShowUrl = `${import.meta.env.VITE_API_BASE_URL}/search/tv?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`;
    
        setFetchUrl(movieUrl); // Start by searching for movies
        setSearch('');
        
        // Fetch TV shows separately
        fetch(tvShowUrl)
            .then((response) => response.json())
            .then((data) => setTVShows(data.results))
            .catch((error) => console.error('Error fetching TV shows:', error));
    };
    
    

    return (
        <MoviesContext.Provider
            value={{
                movies,
                tvShows,
                getMovies,
                search,
                searchMovies,
                setSearch,
            }}
        >
            <BrowserRouter>
                <Header searchMovies={searchMovies} />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movies" element={<MovieList />} />
                    <Route path="/tvshows" element={<TVShowList />} />
                </Routes>
            </BrowserRouter>
        </MoviesContext.Provider>
    );
}

export default App;
