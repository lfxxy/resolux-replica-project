
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useBasket } from "@/hooks/useBasket";

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { items } = useBasket();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black border-b border-red-900/30">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/home" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/fdfd75fd-0287-47f9-820e-e9d7f5f65f01.png" 
              alt="Logo" 
              className="h-20 w-auto"
              loading="eager"
              width="auto"
              height="80"
            />
          </Link>
          <nav className="flex space-x-6">
            <Link 
              to="/home" 
              className={`text-gray-300 hover:text-white transition-colors ${
                location.pathname === '/home' ? 'text-red-500' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/forum" 
              className={`text-gray-300 hover:text-white transition-colors ${
                location.pathname === '/forum' ? 'text-red-500' : ''
              }`}
            >
              Forums
            </Link>
            <Link 
              to="/account" 
              className={`text-gray-300 hover:text-white transition-colors ${
                location.pathname === '/account' ? 'text-red-500' : ''
              }`}
            >
              Account
            </Link>
            <a 
              href="https://discord.gg/resolux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Open a ticket in Discord for support"
            >
              Support
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/basket"
            className={`relative text-gray-300 hover:text-white transition-colors ${
              location.pathname === '/basket' ? 'text-red-500' : ''
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          <Button 
            onClick={logout}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
