import { Heart, Shield, BookOpen, Globe, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA_SOURCES } from "@/constants/dataSources";

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

      <div className="bg-card rounded-lg border p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Data Sources</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Mayagaan integrates multiple respected archives and databases to bring you authentic folk music from around the world:
        </p>
        <div className="space-y-4">
          {DATA_SOURCES.map((source) => (
            <div key={source.name} className="border-l-2 border-primary/30 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{source.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {source.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{source.description}</p>
              <p className="text-xs text-muted-foreground italic mb-2">{source.ethicalNotes}</p>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Visit {source.name} →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          All content is used for educational and archival purposes with proper attribution and respect for cultural origins.
        </p>
      </div>
    </section>
  );
}
