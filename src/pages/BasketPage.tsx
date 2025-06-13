
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const { items, loading, total, removeFromBasket, updateQuantity } = useBasket();

  const formatPrice = (price: number) => {
    // Handle both cents and dollar formats
    if (price < 100) {
      return `$${price.toFixed(2)}`;
    }
    return `$${(price / 100).toFixed(2)}`;
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // This will be implemented with Stripe integration
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading basket...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-red-600" />
            Shopping Basket
          </h1>
          <p className="text-gray-400">
            Review your items before checkout
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="bg-gray-900 border-red-900/30">
            <CardContent className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your basket is empty</h3>
              <p className="text-gray-400 mb-6">Add some items to get started!</p>
              <Link to="/home#subscriptions">
                <Button className="bg-red-600 hover:bg-red-700">
                  Browse Plans
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basket Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-red-900/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.product_name}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">
                            {item.product_type}
                          </Badge>
                          {item.plan_type && (
                            <Badge variant="outline" className="border-red-600 text-red-600">
                              {item.plan_type}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromBasket(item.id)}
                          className="w-8 h-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-red-900/30 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BasketPage;
