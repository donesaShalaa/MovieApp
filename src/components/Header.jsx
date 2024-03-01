import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ searchMovies }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        searchMovies(searchInput);
        setSearchInput('');
    };

    const clearSearch = () => {
        setSearchInput('');
        setFetchUrl(`${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`);
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
