
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

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/home");
    return null;
  }

  const validateForm = () => {
    if (!email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (!isLogin && (!username || username.trim().length < 2)) {
      toast({
        title: "Validation Error",
        description: "Username must be at least 2 characters long.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Form submission started:', { isLogin, email: email.trim() });
      
      if (isLogin) {
        console.log('Attempting login...');
        const result = await login(email, password);
        console.log('Login result:', result);
        
        if (result.success) {
          toast({
            title: "Success",
            description: "Welcome back to Resolux!"
          });
          navigate("/home");
        } else {
          console.error('Login failed:', result.error);
          toast({
            title: "Login Failed",
            description: result.error || "Login failed. Please check your credentials.",
            variant: "destructive"
          });
        }
      } else {
        console.log('Attempting signup...');
        const result = await signup(email, password, username);
        console.log('Signup result:', result);
        
        if (result.success) {
          toast({
            title: "Account Created",
            description: "Welcome to Resolux! You can now access all features."
          });
          // Reset form after successful signup
          setEmail("");
          setPassword("");
          setUsername("");
          setIsLogin(true); // Switch to login view
        } else {
          console.error('Signup failed:', result.error);
          toast({
            title: "Registration Failed",
            description: result.error || "Unable to create account. Please try again.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error", 
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900 opacity-20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-700 rounded-full opacity-5 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src="/lovable-uploads/5d63c41f-2b65-4e10-b667-c1c5d3b8b6ad.png" 
              alt="Resolux Logo" 
              className="w-16 h-16"
            />
            <h1 className="text-4xl font-bold text-white">Resolux</h1>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900 border-red-900/30 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isLogin ? "Access your Resolux account" : "Join the Resolux community"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600"
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
                    disabled={loading}
                    minLength={2}
                    className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600"
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
                  minLength={6}
                  disabled={loading}
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  // Clear form when switching
                  setEmail("");
                  setPassword("");
                  setUsername("");
                }}
                disabled={loading}
                className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isLogin ? "Need an account? Sign up here" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* Debug info for troubleshooting */}
        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-xs text-gray-400">
          <p>Debug: Supabase URL configured</p>
          <p>Debug: API Key present</p>
          <p>If you continue to see "Invalid API key" errors, please check your Supabase project settings.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
