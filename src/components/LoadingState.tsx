import { Music } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <Music className="h-12 w-12 text-primary/20" />
        </div>
        <Music className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <p className="mt-4 text-lg text-muted-foreground animate-fade-in">
        Loading folk music from around the world...
      </p>
    </div>
  );
}
