import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
const Navbar = ({ query, setQuery }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            navigate('/')
        }
    }, [query]);

    return (
        <div className='navBar'>\
            <Link to='/' >Home</Link>
            <input type='text' value={query} onChange={setQuery} />
            <hr />
        </div>
    );
};

export default Navbar;