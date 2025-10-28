import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Unable to load music data
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We're having trouble connecting to the MusicBrainz API. Please check your internet
        connection and try again.
      </p>
      <Button onClick={onRetry} className="bg-gradient-warm hover:opacity-90">
        Try Again
      </Button>
    </div>
  );
}
