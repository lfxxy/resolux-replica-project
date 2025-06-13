
const PaymentStrip = () => {
  const paymentMethods = [
    { 
      name: "Visa", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg",
      alt: "Visa"
    },
    { 
      name: "Mastercard", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg",
      alt: "Mastercard"
    },
    { 
      name: "PayPal", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
      alt: "PayPal"
    },
    { 
      name: "Stripe", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM2NzY2RkYiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMjAgMTlDMjAgMTcuNSAyMS42IDE2IDI0IDE2QzI3IDE2IDI5IDE3IDMwIDE4TDMxIDEzQzI5IDEyIDI2IDExIDI0IDExQzE4IDExIDE0IDE1IDE0IDE5UzE4IDI3IDI0IDI3QzI2IDI3IDI5IDI2IDMxIDI1TDMwIDIwQzI5IDIxIDI3IDIyIDI0IDIyQzIxLjYgMjIgMjAgMjAuNSAyMCAxOVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
      alt: "Stripe"
    },
    { 
      name: "Apple Pay", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik00MS4yIDIyLjNDNDAuNyAyMS45IDM5LjcgMjEuNiAzOC42IDIxLjZDMzcuNSAyMS42IDM2LjMgMjIgMzUuNCAyMi43QzM0LjUgMjMuNCAzNCAyNC40IDM0IDI1LjVDMzQgMjYuNiAzNC41IDI3LjYgMzUuNCAyOC4zQzM2LjMgMjkgMzcuNSAyOS40IDM4LjYgMjkuNEMzOS43IDI5LjQgNDAuNyAyOS4xIDQxLjIgMjguN1YzNi4xSDE1Ljg3ODY4VjQwSDE1LjU0NDFWMzYuMUM2Ni44NjAzVjQwSDE2LjY5MDVWMzYuMUg0MS4yVjI4LjdDNDEuNyAyOS4xIDQyLjcgMjkuNCA0My44IDI5LjRDNDQuOSAyOS40IDQ2LjEgMjkgNDcgMjguM0M0Ny45IDI3LjYgNDguNCAyNi42IDQ4LjQgMjUuNUM0OC40IDI0LjQgNDcuOSAyMy40IDQ3IDIyLjdDNDYuMSAyMiA0NC45IDIxLjYgNDMuOCAyMS42QzQyLjcgMjEuNiA0MS43IDIxLjkgNDEuMiAyMi4zWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNkYmRiZGIiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMjQuMDMgMjBDMjcuMTUgMjAgMjkuODEgMjIuNjYgMjkuODEgMjUuNzhDMjkuODEgMjguOSAyNy4xNSAzMS41NiAyNC4wMyAzMS41NkMyMC45MSAzMS41NiAxOC4yNSAyOC45IDE4LjI1IDI1Ljc4QzE4LjI1IDIyLjY2IDIwLjkxIDIwIDI0LjAzIDIwWk0yNC4wMyAyMy40MkMyMi44MiAyMy40MiAyMS44MyAyNC40MSAyMS44MyAyNS42MkMyMS44MyAyNi44MyAyMi44MiAyNy44MiAyNC4wMyAyNy44MkMyNS4yNCAyNy44MiAyNi4yMyAyNi44MyAyNi4yMyAyNS42MkMyNi4yMyAyNC40MSAyNS4yNCAyMy40MiAyNC4wMyAyMy40MloiIGZpbGw9IiM0Mjg1RjQiLz4KPC9zdmc+Cjwvc3ZnPgo=",
      alt: "Google Pay"
    },
    { 
      name: "Bitcoin", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGNzkzMUEiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMjggMTVWMTJIMjVWMTVIMjFWMTJIMThWMTVIMTNWMThIMTZWMzBIMTNWMzNIMThWMzZIMjFWMzNIMjVWMzZIMjhWMzNIMzNWMzBIMzBWMjdIMzJDMzMuMSAyNyAzNCAyNS45IDM0IDI0LjhWMjMuMkMzNCAyMi4xIDMzLjEgMjEgMzIgMjFIMzBWMThIMzNWMTVIMjhaTTI3IDE4VjIxSDMwQzMwIDIxIDMxIDIxIDMxIDIyVjI0QzMxIDI1IDMwIDI1IDMwIDI1SDI3VjI4SDE2VjE4SDI3WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=",
      alt: "Bitcoin"
    }
  ];

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h3 className="text-sm text-gray-400 font-medium">Accepted Payment Methods</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-center w-12 h-12 bg-white rounded-lg p-2 hover:scale-105 transition-transform">
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain"
                loading="lazy"
                width="48"
                height="48"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStrip;
