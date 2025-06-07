
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfilePictureProps {
  size?: "sm" | "md" | "lg";
  showUpload?: boolean;
}

const ProfilePicture = ({ size = "md", showUpload = false }: ProfilePictureProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-24 w-24"
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // For now, we'll just show a placeholder implementation
    // In a real app, you'd upload to Supabase Storage
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Feature Coming Soon",
        description: "Profile picture upload will be available soon!",
      });
    }, 1000);
  };

  const getInitials = () => {
    if (!user?.username && !user?.email) return "U";
    const name = user.username || user.email;
    return name.charAt(0).toUpperCase();
  };

  const getAvatarUrl = () => {
    // For now, return null to show initials
    // In a real implementation, you'd return the user's uploaded avatar URL
    return null;
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={getAvatarUrl() || undefined} alt="Profile picture" />
        <AvatarFallback className="bg-red-600 text-white">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      
      {showUpload && (
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="avatar-upload"
            disabled={uploading}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => document.getElementById('avatar-upload')?.click()}
            disabled={uploading}
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Change Photo"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
