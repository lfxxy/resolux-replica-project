
import { MessageSquare, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
              alt="Resolux Logo" 
              className="w-8 h-8"
              loading="lazy"
              width="32"
              height="32"
            />
            <span className="text-xl font-bold text-white">Resolux</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://discord.gg/resolux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Discord</span>
            </a>
            <a 
              href="https://youtube.com/@resolux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-red-900/30 text-center text-gray-500 text-sm">
          © 2024 Resolux. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
