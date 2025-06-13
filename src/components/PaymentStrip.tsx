

const PaymentStrip = () => {
  const paymentMethods = [
    { 
      name: "Visa", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzE1NDBCRiIvPgo8dGV4dCB4PSIyMCIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WSVNBPC90ZXh0Pgo8L3N2Zz4=",
      alt: "Visa"
    },
    { 
      name: "Mastercard", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNCIgY3k9IjEyIiByPSI3IiBmaWxsPSIjRkY1RjAwIiBvcGFjaXR5PSIwLjgiLz4KPGNpcmNsZSBjeD0iMjYiIGN5PSIxMiIgcj0iNyIgZmlsbD0iI0ZGNUYwMCIgb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTIiIHI9IjUiIGZpbGw9IiNGRjVGMDAiLz4KPC9zdmc+",
      alt: "Mastercard"
    },
    { 
      name: "American Express", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNkZDRiIvPgo8dGV4dCB4PSIyMCIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BTUVYPC90ZXh0Pgo8L3N2Zz4=",
      alt: "American Express"
    },
    { 
      name: "PayPal", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwMzA4NyIvPgo8cGF0aCBkPSJNMTAgN2gyYzIgMCAzIDEgMyAzcy0xIDMtMyAzaC0ydjJoLTJWN3ptMiAydjJoMmMxIDAgMS0xIDEtMXMwLTEtMS0xaC0yeiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTcgN2gyYzIgMCAzIDEgMyAzcy0xIDMtMyAzaC0ydjJoLTJWN3ptMiAydjJoMmMxIDAgMS0xIDEtMXMwLTEtMS0xaC0yeiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMjQgMTBsMiA0aC0yTDIyIDEwaDJ6IiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0yNyAxMGwyIDRoLTJsLTItNGgyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4=",
      alt: "PayPal"
    },
    { 
      name: "Apple Pay", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTMuNSA2LjVjMC0xLjUtMS4yLTIuNy0yLjctMi43cy0yLjcgMS4yLTIuNyAyLjcgMS4yIDIuNyAyLjcgMi43IDIuNy0xLjIgMi43LTIuN3ptLTIuNyAzLjZjLTEuOCAwLTMuMiAxLjQtMy4yIDMuMiAwIDEuOCAxLjQgMy4yIDMuMiAzLjJzMy4yLTEuNCAzLjItMy4yYzAtMS44LTEuNC0zLjItMy4yLTMuMnoiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjI2IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIj5QYXk8L3RleHQ+Cjwvc3ZnPg==",
      alt: "Apple Pay"
    },
    { 
      name: "Google Pay", 
      logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzRBODVGNyIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjMzQ5NjI1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSI0IiBmaWxsPSIjRkJCQzA0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8Y2lyY2xlIGN4PSIyOCIgY3k9IjEyIiByPSI0IiBmaWxsPSIjRUE0MzM1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=",
      alt: "Google Pay"
    }
  ];

  return (
    <div className="bg-gray-900 border-t border-red-900/30 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <span className="text-gray-400 text-sm font-medium">We accept:</span>
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-center w-16 h-10 bg-white rounded-lg p-2 hover:scale-105 transition-transform shadow-sm">
              <img 
                src={method.logo} 
                alt={method.alt}
                className="w-full h-full object-contain"
                loading="lazy"
                width="40"
                height="24"
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

