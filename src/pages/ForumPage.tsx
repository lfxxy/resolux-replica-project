
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Calendar, Pin, AlertCircle } from "lucide-react";
import { useForums } from "@/hooks/useForums";
import { Badge } from "@/components/ui/badge";
import CreateThreadModal from "@/components/CreateThreadModal";

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, threads, loading, error, fetchThreads } = useForums();

  const categoryMenuItems = [
    { id: "all", name: "All threads", icon: MessageSquare },
    { id: "my", name: "My threads", icon: Users },
  ];

  const filteredThreads = threads.filter(thread => {
    if (searchTerm) {
      return thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             thread.content?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const getThreadCount = (categoryId: string) => {
    return threads.filter(thread => thread.category_id === categoryId).length;
  };

  const getLastPost = (categoryId: string) => {
    const categoryThreads = threads.filter(thread => thread.category_id === categoryId);
    if (categoryThreads.length === 0) return "No posts yet";
    
    const latest = categoryThreads.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )[0];
    
    const timeAgo = getTimeAgo(latest.updated_at);
    return timeAgo;
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Refresh threads when a new thread is created
  useEffect(() => {
    const interval = setInterval(() => {
      fetchThreads();
    }, 5000); // Refresh every 5 seconds to show new threads

    return () => clearInterval(interval);
  }, [fetchThreads]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading forums...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <Card className="bg-gray-900 border-red-900/30 max-w-md">
            <CardContent className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Forums</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            <Card className="bg-gray-900 border-red-900/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categoryMenuItems.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Community Forums</h1>
                <p className="text-gray-400">
                  Connect with the Resolux community and discuss everything related to our premium gaming solutions.
                </p>
              </div>
              <CreateThreadModal categories={categories} />
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <Input 
                placeholder="Search forums..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border-red-900/30 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600"
              />
              <Button className="bg-red-600 hover:bg-red-700">Search</Button>
            </div>

            {/* Forum Categories */}
            {selectedCategory === "all" && (
              <div className="space-y-6">
                {categories.map((category) => (
                  <Card key={category.id} className="bg-gray-900 border-red-900/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-red-500" />
                        {category.name}
                      </CardTitle>
                      {category.description && (
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-3 rounded hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-600/20 rounded flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Discussions</h3>
                            <p className="text-sm text-gray-400">{getThreadCount(category.id)} threads</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Last post</p>
                          <p className="text-xs text-gray-500">{getLastPost(category.id)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Recent Threads */}
            {selectedCategory === "all" && (
              <Card className="bg-gray-900 border-red-900/30">
                <CardHeader>
                  <CardTitle className="text-white">Recent Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredThreads.slice(0, 10).map((thread) => (
                      <div key={thread.id} className="flex items-center justify-between p-3 rounded hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          {thread.is_pinned && <Pin className="h-4 w-4 text-red-500" />}
                          <div>
                            <h3 className="text-white font-medium">{thread.title}</h3>
                            <p className="text-sm text-gray-400">
                              by {thread.profiles?.username || 'Unknown'} • {getTimeAgo(thread.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {thread.is_pinned && <Badge variant="secondary">Pinned</Badge>}
                          {thread.is_locked && <Badge variant="destructive">Locked</Badge>}
                        </div>
                      </div>
                    ))}
                    {filteredThreads.length === 0 && (
                      <p className="text-gray-400 text-center py-4">No threads found</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForumPage;
