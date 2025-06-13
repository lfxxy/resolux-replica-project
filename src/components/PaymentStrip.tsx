
const PaymentStrip = () => {
  const paymentMethods = [
    { 
      name: "Visa", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
      alt: "Visa"
    },
    { 
      name: "Mastercard", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
      alt: "Mastercard"
    },
    { 
      name: "PayPal", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
      alt: "PayPal"
    },
    { 
      name: "Stripe", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
      alt: "Stripe"
    },
    { 
      name: "Apple Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
      alt: "Google Pay"
    },
    { 
      name: "Bitcoin", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
      alt: "Bitcoin"
    }
  ];

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-center w-16 h-12 bg-white rounded-lg p-3 hover:scale-105 transition-transform">
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain filter"
                loading="lazy"
                width="64"
                height="48"
                onError={(e) => {
                  console.log(`Failed to load ${method.name} logo`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const fallback = document.createElement('span');
                    fallback.className = 'fallback-text text-xs text-gray-800 font-medium';
                    fallback.textContent = method.name;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
