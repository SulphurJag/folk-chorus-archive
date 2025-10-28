import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContributeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContributeModal({ open, onClose }: ContributeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    artist: "",
    region: "",
    country: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Thank you for your contribution!",
      description: "Your submission will be reviewed by our team.",
    });
    
    setFormData({
      name: "",
      title: "",
      artist: "",
      region: "",
      country: "",
      description: "",
    });
    
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="h-2 bg-gradient-warm rounded-t-lg -mt-6 -mx-6 mb-4" />
        
        <DialogHeader>
          <DialogTitle className="text-2xl">Contribute to Mayagaan</DialogTitle>
          <DialogDescription className="text-sm">
            Help us preserve and share global folk music heritage. All contributions are
            reviewed for authenticity and cultural respect.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Song/Music Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the song title"
              required
            />
          </div>

          <div>
            <Label htmlFor="artist">Artist/Performer</Label>
            <Input
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Artist or traditional source"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., South Asia"
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g., Nepal"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description & Cultural Context</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the song's history, cultural significance, and traditions..."
              rows={4}
              required
            />
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              File upload feature coming soon
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Audio files, images, and documents
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ensure you have permission to share this content</li>
              <li>Respect cultural origins and provide proper attribution</li>
              <li>Content will be used for educational and archival purposes</li>
              <li>All submissions are reviewed before publication</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-warm hover:opacity-90"
            >
              Submit Contribution
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
