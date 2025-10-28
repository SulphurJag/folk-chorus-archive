import { Music, MapPin, Calendar, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolkMusicEntry } from "@/types/music";

interface MusicCardProps {
  entry: FolkMusicEntry;
  onClick: () => void;
}

export function MusicCard({ entry, onClick }: MusicCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all hover:shadow-warm hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden"
      onClick={onClick}
    >
      <div className="h-2 bg-gradient-warm" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
              {entry.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {entry.artist}
            </p>
          </div>
          <Music className="h-5 w-5 text-primary shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-foreground/80 line-clamp-2">
          {entry.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {entry.country}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {entry.era}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1">
          {entry.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-primary/5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          size="sm" 
          className="w-full bg-gradient-warm hover:opacity-90 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Play className="h-4 w-4 mr-2" />
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
}
