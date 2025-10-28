import { Heart, Globe } from "lucide-react";

interface FooterProps {
  onContributeClick: () => void;
  onAboutClick: () => void;
}

export function Footer({ onContributeClick, onAboutClick }: FooterProps) {
  return (
    <footer className="border-t bg-card/50 mt-12">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Mayagaan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enchanting the world with global folk music: history, culture, knowledge, and
              media.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onAboutClick}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={onContributeClick}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contribute
                </button>
              </li>
              <li>
                <a
                  href="https://musicbrainz.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  MusicBrainz API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Attribution Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for preserving
            global cultural heritage
          </p>
          <p className="mt-2">© 2025 Mayagaan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
