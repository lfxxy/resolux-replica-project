
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/forum" className="text-2xl font-bold">
            <span className="text-red-500">Resolux</span>
          </Link>
          <nav className="flex space-x-6">
            <Link 
              to="/forum" 
              className={`text-gray-300 hover:text-white transition-colors ${
                location.pathname === '/forum' ? 'text-white' : ''
              }`}
            >
              Forums
            </Link>
            <Link 
              to="/account" 
              className={`text-gray-300 hover:text-white transition-colors ${
                location.pathname === '/account' ? 'text-white' : ''
              }`}
            >
              Account
            </Link>
            <span className="text-gray-300">Support</span>
          </nav>
        </div>
        <Button 
          onClick={logout}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
