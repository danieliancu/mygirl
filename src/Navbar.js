import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Funcție pentru a închide meniul la selectarea unui link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="p-5 border-b border-gray-600 sticky top-0 w-full bg-black z-10">
      <div className="flex justify-between items-center">
        <Link className="text-2xl font-bold" to="/" onClick={closeMenu}><span className="text-red-500">&#10084;</span> MyGirl</Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <p>|||</p>
          </button>
        </div>
        <div className={`absolute z-10 bg-black top-[60px] p-5 right-0 w-full ${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <Link to="/explorer" className="block py-2 hover:text-white" onClick={closeMenu}>Explorează</Link>
          <Link to="/chat" className="block py-2 hover:text-white" onClick={closeMenu}>Chat</Link>
          <Link to="/create" className="block py-2 hover:text-white" onClick={closeMenu}>Creează</Link>
          <Link className="block py-2 hover:text-white" onClick={closeMenu}>Sign Up</Link>
          <Link className="block py-2 hover:text-white" onClick={closeMenu}>Sign In</Link>
        </div>
        <div className="hidden md:flex justify-between items-center space-x-4">
          <Link to="/explorer" className="hover:text-white">Explorează</Link>
          <Link to="/chat" className="hover:text-white">Chat</Link>
          <Link to="/create" className="hover:text-white">Creează</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link className="hover:text-white">Sign Up</Link>
          <Link className="hover:text-white">Sign In</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
