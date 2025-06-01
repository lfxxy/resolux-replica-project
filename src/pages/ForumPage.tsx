
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Calendar, Pin } from "lucide-react";

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All threads", icon: MessageSquare },
    { id: "my", name: "My threads", icon: Users },
    { id: "create", name: "Create thread", icon: Calendar },
  ];

  const forumSections = [
    {
      title: "Information",
      items: [
        { name: "Announcements", icon: Pin, posts: 24, lastPost: "2 hours ago" },
        { name: "Pre-sale questions", icon: MessageSquare, posts: 156, lastPost: "5 minutes ago" },
        { name: "Sellers", icon: Users, posts: 89, lastPost: "1 hour ago" },
      ]
    },
    {
      title: "Counter-Strike 2",
      items: [
        { name: "News", icon: MessageSquare, posts: 342, lastPost: "10 minutes ago" },
        { name: "Instructions & FAQ", icon: MessageSquare, posts: 78, lastPost: "30 minutes ago" },
        { name: "Configs", icon: MessageSquare, posts: 234, lastPost: "15 minutes ago" },
        { name: "Media", icon: MessageSquare, posts: 167, lastPost: "45 minutes ago" },
        { name: "Reviews", icon: MessageSquare, posts: 456, lastPost: "5 minutes ago" },
      ]
    },
    {
      title: "Off-topic",
      items: [
        { name: "Off-topic", icon: MessageSquare, posts: 189, lastPost: "20 minutes ago" },
      ]
    },
    {
      title: "Contacts", 
      items: [
        { name: "VK", icon: MessageSquare, posts: 12, lastPost: "2 days ago" },
        { name: "Telegram", icon: MessageSquare, posts: 45, lastPost: "6 hours ago" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
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
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Forums</h1>
              <p className="text-gray-400">
                Connect with the Resolux community and discuss everything related to our products and services.
              </p>
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <Input 
                placeholder="Search forums..." 
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button className="bg-red-600 hover:bg-red-700">Search</Button>
            </div>

            {/* Forum Sections */}
            {forumSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-gray-300" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.posts} posts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Last post</p>
                          <p className="text-xs text-gray-500">{item.lastPost}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
