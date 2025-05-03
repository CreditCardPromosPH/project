import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ChevronLeft, ExternalLink, Clock, Share2, Heart } from 'lucide-react';
import { usePromos } from '../context/PromoContext';
import { Promo } from '../types';
import BankLogo from '../components/BankLogo';
import toast from 'react-hot-toast';

const PromoDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { promos, loading } = usePromos();
  const [promo, setPromo] = useState<Promo | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && id) {
      const foundPromo = promos.find((p) => p.id === id);
      if (foundPromo) {
        setPromo(foundPromo);
        
        // Check if this promo is in favorites
        const favorites = JSON.parse(localStorage.getItem('favoritePromos') || '[]');
        setIsFavorited(favorites.includes(id));
      } else {
        // If promo not found, redirect to home
        navigate('/');
      }
    }
  }, [id, promos, loading, navigate]);
  
  const handleFavorite = () => {
    if (!promo) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoritePromos') || '[]');
    
    if (isFavorited) {
      // Remove from favorites
      const newFavorites = favorites.filter((favId: string) => favId !== promo.id);
      localStorage.setItem('favoritePromos', JSON.stringify(newFavorites));
      setIsFavorited(false);
      toast.success('Removed from favorites');
    } else {
      // Add to favorites
      localStorage.setItem('favoritePromos', JSON.stringify([...favorites, promo.id]));
      setIsFavorited(true);
      toast.success('Added to favorites');
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: promo?.title || 'Credit Card Promotion',
        text: promo?.description || 'Check out this credit card promotion!',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-slate-200 rounded-xl mb-8"></div>
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  if (!promo) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Promotion not found.</p>
        <Link 
          to="/"
          className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Remove date formatting and just use the raw value
  const formattedDate = promo.validUntil;
  
  // Remove days left calculation since we're not parsing dates anymore
  const daysLeft = 0;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 transition-colors"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to all promotions
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="relative h-64 md:h-80">
          <img 
            src={promo.image || 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg'} 
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <BankLogo bank={promo.bank} size="lg" />
              <div>
                <span className="text-white font-medium">{promo.bank}</span>
                <div className="flex items-center mt-1">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-white/20 text-white backdrop-blur-sm">
                    {promo.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800">{promo.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-slate-600">
              <Calendar size={18} className="mr-2" />
              <span>Valid until {formattedDate}</span>
            </div>
            
            <div className="flex items-center text-slate-600">
              <Tag size={18} className="mr-2" />
              <span>{promo.category}</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-slate-700 leading-relaxed">
              {promo.description}
            </p>
            
            {promo.termsAndConditions && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
                <p className="text-slate-600 text-sm">{promo.termsAndConditions}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {promo.externalLink && (
              <a 
                href={promo.externalLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View Offer on {promo.bank}
                <ExternalLink size={18} className="ml-2" />
              </a>
            )}
            
            <button
              onClick={handleFavorite}
              className={`flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 rounded-lg border transition-colors ${
                isFavorited 
                  ? 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart size={18} className={`mr-2 ${isFavorited ? 'fill-pink-600' : ''}`} />
              {isFavorited ? 'Favorited' : 'Add to Favorites'}
            </button>
            
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Share2 size={18} className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDetailsPage;