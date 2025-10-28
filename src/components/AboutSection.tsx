import { Heart, Shield, BookOpen, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="space-y-8 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          About Mayagaan
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Mayagaan is a living digital archive celebrating the rich tapestry of global folk
          music. We believe folk music offers an enchanting window into the human condition,
          preserving stories, traditions, and cultural identities across generations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Global Heritage</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Aggregating folk music from every corner of the world, celebrating diversity and
            cultural richness.
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <Heart className="h-8 w-8 text-accent mb-2" />
            <CardTitle className="text-lg">Cultural Respect</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Honoring the origins and creators of each piece, with proper attribution and
            ethical curation.
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <Shield className="h-8 w-8 text-secondary mb-2" />
            <CardTitle className="text-lg">Ethical Practice</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            All content sourced responsibly from public databases and community contributions
            with consent.
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Education First</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Designed for learning, research, and preservation—keeping folk traditions alive
            for future generations.
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-card">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Our Mission
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Folk music tells stories of love, struggle, celebration, and everyday life. It
          connects us to our ancestors and to each other. Through Mayagaan, we aim to:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Preserve endangered musical traditions for future generations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Make folk music accessible to researchers, educators, and enthusiasts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Foster cross-cultural understanding through shared musical heritage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Support communities in documenting and sharing their own musical traditions
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Data sourced from MusicBrainz and community contributions. All content is used for
          educational and archival purposes with proper attribution.
        </p>
      </div>
    </section>
  );
}
