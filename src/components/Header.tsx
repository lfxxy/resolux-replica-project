
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-black border-b border-red-900/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/home" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
              alt="Resolux Logo" 
              className="w-8 h-8"
              loading="eager"
              width="32"
              height="32"
            />
            <span className="text-2xl font-bold text-white">Resolux</span>
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
        <Button 
          onClick={logout}
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
