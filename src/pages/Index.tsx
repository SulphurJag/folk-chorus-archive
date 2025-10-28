import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MusicCard } from "@/components/MusicCard";
import { DetailModal } from "@/components/DetailModal";
import { ContributeModal } from "@/components/ContributeModal";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolkMusicEntry, FilterState } from "@/types/music";
import { fetchFolkMusic } from "@/utils/musicbrainz";

const Index = () => {
  const [entries, setEntries] = useState<FolkMusicEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<FolkMusicEntry | null>(null);
  const [showContribute, setShowContribute] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    region: "All Regions",
    era: "All Eras",
    tags: [],
    sortBy: "relevance",
  });

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchFolkMusic();
      setEntries(data);
    } catch (err) {
      setError(true);
      console.error("Error loading music:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Filter by query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.artist.toLowerCase().includes(query) ||
          entry.country.toLowerCase().includes(query) ||
          entry.region.toLowerCase().includes(query) ||
          entry.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by region
    if (filters.region !== "All Regions") {
      result = result.filter((entry) => entry.region === filters.region);
    }

    // Filter by era
    if (filters.era !== "All Eras") {
      result = result.filter((entry) => entry.era === filters.era);
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      result = result.filter((entry) =>
        filters.tags.some((tag) => entry.tags.includes(tag))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "era":
        result.sort((a, b) => a.era.localeCompare(b.era));
        break;
      case "region":
        result.sort((a, b) => a.region.localeCompare(b.region));
        break;
      default:
        break;
    }

    return result;
  }, [entries, filters]);

  const handleResetFilters = () => {
    setFilters({
      query: "",
      region: "All Regions",
      era: "All Eras",
      tags: [],
      sortBy: "relevance",
    });
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-hero">
        <Header
          searchQuery={filters.query}
          onSearchChange={(query) => setFilters((prev) => ({ ...prev, query }))}
          onContributeClick={() => setShowContribute(true)}
          onAboutClick={() => setShowAbout(true)}
        />
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-hero">
        <Header
          searchQuery={filters.query}
          onSearchChange={(query) => setFilters((prev) => ({ ...prev, query }))}
          onContributeClick={() => setShowContribute(true)}
          onAboutClick={() => setShowAbout(true)}
        />
        <ErrorState onRetry={loadMusic} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header
        searchQuery={filters.query}
        onSearchChange={(query) => setFilters((prev) => ({ ...prev, query }))}
        onContributeClick={() => setShowContribute(true)}
        onAboutClick={() => setShowAbout(true)}
      />

      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            region={filters.region}
            era={filters.era}
            selectedTags={filters.tags}
            onRegionChange={(region) => setFilters((prev) => ({ ...prev, region }))}
            onEraChange={(era) => setFilters((prev) => ({ ...prev, era }))}
            onTagToggle={handleTagToggle}
            onReset={handleResetFilters}
          />

          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Explore Global Folk Music
                </h2>
                <p className="text-muted-foreground mt-1">
                  {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"} found
                </p>
              </div>
              
              <Select
                value={filters.sortBy}
                onValueChange={(value: any) =>
                  setFilters((prev) => ({ ...prev, sortBy: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="era">By Era</SelectItem>
                  <SelectItem value="region">By Region</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No entries match your filters. Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up">
                {filteredEntries.map((entry) => (
                  <MusicCard
                    key={entry.id}
                    entry={entry}
                    onClick={() => setSelectedEntry(entry)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {showAbout && (
          <div className="mt-12">
            <AboutSection />
          </div>
        )}
      </main>

      <Footer
        onContributeClick={() => setShowContribute(true)}
        onAboutClick={() => setShowAbout(!showAbout)}
      />

      <DetailModal
        entry={selectedEntry}
        open={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />

      <ContributeModal
        open={showContribute}
        onClose={() => setShowContribute(false)}
      />
    </div>
  );
};

export default Index;
