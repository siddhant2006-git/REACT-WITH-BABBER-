
import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlignRight } from 'react-icons/fi';
import { Gifstate } from './context/context';

function Header() {
  const {  gf, setfilter, filter, favorite  } = Gifstate();

  return (
    
    
    <nav>
      <div className="w-full h-20 flex items-center justify-between px-4 bg-gray-900 text-white">
        <Link to="/" className="flex items-center gap-3">
          <img src="logo.svg" className="w-8" alt="Gify" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight cursor-pointer">Gify</h1>
        </Link>

        <Link
          to="/favorite"
          className="text-2xl font-bold tracking-tight cursor-pointer border-2 border-white/30 px-3 py-1 rounded"
        >
          Favorite gif
        </Link>

        <button className="text-white text-2xl p-2 rounded hover:bg-white/10" type="button">
          <FiAlignRight />
        </button>
      </div>
    </nav>
  );
}

export default Header;