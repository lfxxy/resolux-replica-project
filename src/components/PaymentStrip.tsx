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
      name: "American Express", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
      alt: "American Express"
    },
    { 
      name: "PayPal", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
      alt: "PayPal"
    },
    { 
      name: "Apple Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_%28GPay%29_Logo.svg",
      alt: "Google Pay"
    },
    {
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
      alt: "Stripe"
    },
    {
      name: "Steam",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
      alt: "Steam"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    console.log(`Failed to load image: ${target.src}`);
    // Try fallback or hide the container if image fails to load
    const container = target.closest('.payment-logo-container');
    if (container) {
      (container as HTMLElement).style.opacity = '0.5';
    }
  };

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {paymentMethods.map((method, index) => (
            <div 
              key={index} 
              className="payment-logo-container flex items-center justify-center w-16 h-10 bg-white rounded-md p-2 hover:scale-105 transition-all duration-200 shadow-sm border border-gray-200"
            >
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain filter brightness-100"
                loading="lazy"
                width="64"
                height="40"
                decoding="async"
                onError={handleImageError}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
