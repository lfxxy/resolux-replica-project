
const PaymentStrip = () => {
  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "PayPal", logo: "🅿️" },
    { name: "Stripe", logo: "💰" },
    { name: "Crypto", logo: "₿" },
    { name: "Apple Pay", logo: "🍎" },
    { name: "Google Pay", logo: "🅖" }
  ];

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h3 className="text-sm text-gray-400 font-medium">Accepted Payment Methods</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors">
              <span className="text-2xl">{method.logo}</span>
              <span className="text-sm font-medium">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
