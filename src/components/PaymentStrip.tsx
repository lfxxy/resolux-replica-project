
const PaymentStrip = () => {
  const paymentMethods = [
    { 
      name: "Visa", 
      logo: "https://cdn.worldvectorlogo.com/logos/visa-10.svg",
      alt: "Visa"
    },
    { 
      name: "Mastercard", 
      logo: "https://cdn.worldvectorlogo.com/logos/mastercard-6.svg",
      alt: "Mastercard"
    },
    { 
      name: "American Express", 
      logo: "https://cdn.worldvectorlogo.com/logos/american-express-3.svg",
      alt: "American Express"
    },
    { 
      name: "PayPal", 
      logo: "https://cdn.worldvectorlogo.com/logos/paypal-2.svg",
      alt: "PayPal"
    },
    { 
      name: "Apple Pay", 
      logo: "https://cdn.worldvectorlogo.com/logos/apple-pay-2.svg",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "https://cdn.worldvectorlogo.com/logos/google-pay-2.svg",
      alt: "Google Pay"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    console.log(`Failed to load image: ${target.src}`);
    // Hide the container if image fails to load
    const container = target.closest('.payment-logo-container');
    if (container) {
      (container as HTMLElement).style.display = 'none';
    }
  };

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {paymentMethods.map((method, index) => (
            <div 
              key={index} 
              className="payment-logo-container flex items-center justify-center w-20 h-12 bg-white rounded-lg p-3 hover:scale-105 transition-transform shadow-sm"
            >
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain"
                loading="lazy"
                width="80"
                height="48"
                decoding="async"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
