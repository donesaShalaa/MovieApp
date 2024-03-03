// Header.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../App';
import './Header.css';

const Header = ({ clearSearch }) => {
    const { searchMovies, searchTVShows } = useContext(MoviesContext);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        if (window.location.pathname === '/movies') {
            searchMovies(searchInput);
        } else if (window.location.pathname === '/tvshows') {
            searchTVShows(searchInput);
        }
        setSearchInput('');
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/movies" onClick={clearSearch}>Movies</Link></li>
                    <li><Link to="/tvshows" onClick={clearSearch}>TV Shows</Link></li>
                </ul>
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
