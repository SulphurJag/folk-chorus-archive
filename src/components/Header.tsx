import { Globe, Music, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onContributeClick: () => void;
  onAboutClick: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  onContributeClick,
  onAboutClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-card">
      <div className="container flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">Mayagaan</h1>
            <p className="text-xs text-muted-foreground">Global folk music archive</p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by song, region, artist, instrument..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 bg-background/50"
            />
          </div>

          <Button
            onClick={onContributeClick}
            size="sm"
            className="hidden md:flex bg-gradient-warm hover:opacity-90 transition-opacity"
          >
            <Music className="mr-2 h-4 w-4" />
            Contribute
          </Button>

          <Button
            onClick={onAboutClick}
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
          >
            About
          </Button>
        </div>
      </div>
    </header>
  );
}
