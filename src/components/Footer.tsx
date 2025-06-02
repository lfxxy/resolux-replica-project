
const Footer = () => {
  const slogans = [
    "Dominate the Game, Not Your Wallet.",
    "Premium Performance, Competitive Cost.",
    "Affordable Mods. Unbeatable Control.",
    "Premium mod menu"
  ];

  return (
    <footer className="bg-black border-t border-red-900/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
              alt="Resolux Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Resolux</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center md:text-right">
            {slogans.map((slogan, index) => (
              <div key={index} className="text-gray-400 text-sm">
                {slogan}
              </div>
            ))}
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
