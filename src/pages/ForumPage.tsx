
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Bell } from "lucide-react";

const ForumPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <MessageSquare className="w-10 h-10 text-red-600" />
              Community Forums
            </h1>
            <p className="text-xl text-gray-400">
              Connect with the Resolux community
            </p>
          </div>

          <Card className="bg-gray-900 border-red-900/30 max-w-2xl mx-auto">
            <CardHeader className="text-center pb-4">
              <Clock className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-white">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                We're working hard to bring you an amazing community forum experience. 
                Our forums will allow you to connect with other Resolux users, share tips, 
                and get help from our community.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-300">
                  <Bell className="w-5 h-5 text-red-500" />
                  <span>Get notified when forums launch</span>
                </div>
                
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3">
                  Notify Me
                </Button>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500 mb-4">
                  In the meantime, check out our premium subscriptions:
                </p>
                <Button 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => window.location.href = '/home#subscriptions'}
                >
                  View Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForumPage;
