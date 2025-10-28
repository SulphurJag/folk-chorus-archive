import { X, MapPin, Calendar, Tag, Music } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolkMusicEntry } from "@/types/music";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailModalProps {
  entry: FolkMusicEntry | null;
  open: boolean;
  onClose: () => void;
}

export function DetailModal({ entry, open, onClose }: DetailModalProps) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0">
        <div className="h-2 bg-gradient-warm" />
        
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground">
                {entry.title}
              </DialogTitle>
              <p className="text-lg text-muted-foreground mt-1">
                {entry.artist}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-140px)]">
          <div className="px-6 pb-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {entry.country} • {entry.region}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {entry.era}
                {entry.year && ` (${entry.year})`}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-primary/5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Description
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {entry.description}
              </p>
            </div>

            {entry.audio && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Music className="h-4 w-4 text-primary" />
                  Audio Player
                </h3>
                <audio
                  controls
                  className="w-full"
                  src={entry.audio}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Data sourced from MusicBrainz. All rights belong to their respective owners.
                For educational and archival purposes only.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
