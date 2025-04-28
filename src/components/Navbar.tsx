
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Eye } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Eye className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-900">RetinaVision</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button 
                  variant={isActiveLink('/') ? "default" : "ghost"} 
                  className="font-medium"
                >
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  variant={isActiveLink('/dashboard') ? "default" : "ghost"} 
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant={isActiveLink('/about') ? "default" : "ghost"} 
                  className="font-medium"
                >
                  About
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/">
              <Button 
                variant={isActiveLink('/') ? "default" : "ghost"} 
                className="w-full justify-start font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={isActiveLink('/dashboard') ? "default" : "ghost"} 
                className="w-full justify-start font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant={isActiveLink('/about') ? "default" : "ghost"} 
                className="w-full justify-start font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
