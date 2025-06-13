
import { MessageSquare, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/c61e5f43-ae60-42c3-b015-9fdc58ff9bb2.png" 
              alt="Logo" 
              className="h-14 w-auto"
              loading="lazy"
              width="auto"
              height="56"
            />
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
          © 2024 All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
