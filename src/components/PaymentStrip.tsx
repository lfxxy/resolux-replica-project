
const PaymentStrip = () => {
  const paymentMethods = [
    { 
      name: "Visa", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      alt: "Visa"
    },
    { 
      name: "Mastercard", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
      alt: "Mastercard"
    },
    { 
      name: "American Express", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1202px-American_Express_logo_%282018%29.svg.png",
      alt: "American Express"
    },
    { 
      name: "PayPal", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png",
      alt: "PayPal"
    },
    { 
      name: "Apple Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1280px-Apple_Pay_logo.svg.png",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_%28GPay%29_Logo.svg/1200px-Google_Pay_%28GPay%29_Logo.svg.png",
      alt: "Google Pay"
    }
  ];

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-center w-20 h-12 bg-white rounded-lg p-3 hover:scale-105 transition-transform shadow-sm">
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain"
                loading="lazy"
                width="80"
                height="48"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
