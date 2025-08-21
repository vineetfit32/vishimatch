import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-dating.jpg";

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  avatar: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState<"home" | "create" | "browse">("home");
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: "Emma",
      age: 28,
      location: "New York, NY",
      bio: "Love hiking, coffee, and spontaneous adventures. Looking for someone who shares my passion for life!",
      interests: ["Hiking", "Coffee", "Travel", "Photography"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Alex",
      age: 32,
      location: "Los Angeles, CA", 
      bio: "Chef by day, musician by night. Always looking for new experiences and great conversations.",
      interests: ["Cooking", "Music", "Art", "Wine"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Sofia",
      age: 26,
      location: "Miami, FL",
      bio: "Yoga instructor who loves the ocean and sunset meditation. Seeking genuine connections.",
      interests: ["Yoga", "Beach", "Meditation", "Health"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    }
  ]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    interests: ""
  });

  const handleCreateProfile = () => {
    if (!formData.name || !formData.age || !formData.bio) return;
    
    const newProfile: Profile = {
      id: profiles.length + 1,
      name: formData.name,
      age: parseInt(formData.age),
      location: formData.location || "Unknown",
      bio: formData.bio,
      interests: formData.interests.split(",").map(i => i.trim()).filter(i => i),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    };
    
    setProfiles([...profiles, newProfile]);
    setFormData({ name: "", age: "", location: "", bio: "", interests: "" });
    setCurrentSection("browse");
  };

  const HeroSection = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-hero opacity-90"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-float mb-8">
          <Heart className="w-20 h-20 mx-auto text-white mb-6 animate-pulse-glow" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg">
          Find Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200"> Match</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
          Connect with amazing people who share your interests and values. Start your love story today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="romantic" 
            size="lg" 
            onClick={() => setCurrentSection("create")}
            className="px-8 py-6 text-lg font-semibold shadow-romantic hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Profile
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => setCurrentSection("browse")}
            className="px-8 py-6 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
          >
            <Users className="w-5 h-5 mr-2" />
            Browse Profiles
          </Button>
        </div>
      </div>
    </div>
  );

  const CreateProfile = () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentSection("home")}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h2 className="text-4xl font-bold text-foreground mb-4">Create Your Profile</h2>
          <p className="text-muted-foreground">Tell us about yourself to find your perfect match</p>
        </div>

        <Card className="shadow-card-custom bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Your Dating Profile
            </CardTitle>
            <CardDescription>Share what makes you unique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your first name"
                  className="transition-all duration-300 focus:shadow-romantic focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input 
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  placeholder="25"
                  className="transition-all duration-300 focus:shadow-romantic focus:scale-105"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="City, State"
                className="transition-all duration-300 focus:shadow-romantic focus:scale-105"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">About You *</Label>
              <Textarea 
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about your interests, what you're looking for, and what makes you special..."
                rows={4}
                className="transition-all duration-300 focus:shadow-romantic focus:scale-105"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input 
                id="interests"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                placeholder="Travel, Music, Cooking, Sports (comma separated)"
                className="transition-all duration-300 focus:shadow-romantic focus:scale-105"
              />
            </div>
            
            <Button 
              onClick={handleCreateProfile}
              variant="romantic"
              size="lg" 
              className="w-full py-6 text-lg font-semibold shadow-romantic hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              disabled={!formData.name || !formData.age || !formData.bio}
            >
              <Heart className="w-5 h-5 mr-2" />
              Create My Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const BrowseProfiles = () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentSection("home")}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h2 className="text-4xl font-bold text-foreground mb-4">Discover Amazing People</h2>
          <p className="text-muted-foreground">Find your perfect match among these wonderful profiles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card 
              key={profile.id} 
              className="shadow-card-custom bg-gradient-card border-0 hover:shadow-romantic transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="romantic" 
                    className="flex-1 transition-all duration-300 hover:shadow-glow"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 transition-all duration-300 hover:shadow-card-custom"
                  >
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentSection === "home" && <HeroSection />}
      {currentSection === "create" && <CreateProfile />}
      {currentSection === "browse" && <BrowseProfiles />}
    </div>
  );
};

export default Index;