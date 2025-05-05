import React from 'react';
import { CreditCard, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-6 w-6" />
              <span className="text-xl font-bold">CreditCardPromos.ph</span>
            </Link>
            <p className="text-slate-300 mb-4">
              Your go-to resource for the latest credit card promotions from all major banks.
              Never miss a valuable deal again.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#featured" className="text-slate-300 hover:text-white transition-colors">
                  Featured Promos
                </Link>
              </li>
              <li>
                <Link to="/#banks" className="text-slate-300 hover:text-white transition-colors">
                  Banks Directory
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} CreditCardPromos.ph. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Updated daily with the latest promotions. Last synced: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;