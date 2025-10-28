import { Globe, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { REGIONS, ERAS, COMMON_TAGS } from "@/constants/sampleData";

interface FilterSidebarProps {
  region: string;
  era: string;
  selectedTags: string[];
  onRegionChange: (region: string) => void;
  onEraChange: (era: string) => void;
  onTagToggle: (tag: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  region,
  era,
  selectedTags,
  onRegionChange,
  onEraChange,
  onTagToggle,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-64 space-y-6 p-4 bg-card rounded-lg border shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filters
        </h2>
        <Button
          onClick={onReset}
          variant="ghost"
          size="sm"
          className="h-8 hover:bg-primary/10"
        >
          <Globe className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Region
          </label>
          <Select value={region} onValueChange={onRegionChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Era
          </label>
          <Select value={era} onValueChange={onEraChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ERAS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
