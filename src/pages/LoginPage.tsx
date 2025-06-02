
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const slogans = [
    "Dominate the Game, Not Your Wallet.",
    "Premium Performance, Competitive Cost.",
    "Affordable Mods. Unbeatable Control.",
    "Premium mod menu"
  ];

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/forum");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(email, password, username);
      }

      if (success) {
        toast({
          title: "Success!",
          description: isLogin ? "Logged in successfully" : "Account created successfully"
        });
        navigate("/forum");
      } else {
        toast({
          title: "Error",
          description: "Authentication failed",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-600 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col space-y-8 flex-1 pr-12">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
              alt="Resolux Logo" 
              className="w-20 h-20"
            />
            <h1 className="text-6xl font-bold text-white">
              Resolux
            </h1>
          </div>
          
          <div className="space-y-4">
            {slogans.map((slogan, index) => (
              <div key={index} className="text-gray-300 text-lg font-medium">
                {slogan}
              </div>
            ))}
          </div>
          
          <div className="text-gray-400 text-sm">
            Join thousands of gamers who trust Resolux for their gaming enhancement needs.
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
                alt="Resolux Logo" 
                className="w-12 h-12"
              />
              <CardTitle className="text-3xl font-bold text-white">
                Resolux
              </CardTitle>
            </div>
            {!window.innerWidth || window.innerWidth >= 1024 ? (
              <CardTitle className="text-2xl font-bold text-white">
                Welcome Back
              </CardTitle>
            ) : null}
            <CardDescription className="text-gray-400">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              {!isLogin && (
                <div>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              )}
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-500 hover:text-red-400 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
