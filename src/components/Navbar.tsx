import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCard, Search, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-700 hover:text-primary-600 transition-colors"
          >
            <CreditCard className="h-6 w-6 md:h-7 md:w-7" />
            <span className="text-xl md:text-2xl font-bold">CreditCardPromos.ph</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <div className="flex space-x-6">
              <Link to="/" className="text-slate-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link to="/#featured" className="text-slate-700 hover:text-primary-600 transition-colors">
                Featured
              </Link>
              <Link to="/#banks" className="text-slate-700 hover:text-primary-600 transition-colors">
                Banks
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <SearchBar />
            <div className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-slate-700 hover:text-primary-600 py-2 transition-colors">
                Home
              </Link>
              <Link to="/#featured" className="text-slate-700 hover:text-primary-600 py-2 transition-colors">
                Featured
              </Link>
              <Link to="/#banks" className="text-slate-700 hover:text-primary-600 py-2 transition-colors">
                Banks
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;