import { FolkMusicEntry } from "@/types/music";

const SMITHSONIAN_API = "https://api.si.edu/openaccess/api/v1.0";
const API_KEY = import.meta.env.VITE_SMITHSONIAN_API_KEY || "";

interface SmithsonianRow {
  id: string;
  title: string;
  content?: {
    descriptiveNonRepeating?: {
      title?: { content?: string };
      record_link?: string;
      metadata_usage?: { access?: string };
    };
    indexedStructured?: {
      date?: string[];
      place?: string[];
      topic?: string[];
      culture?: string[];
      object_type?: string[];
    };
    freetext?: {
      notes?: Array<{ content?: string }>;
      physicalDescription?: Array<{ content?: string }>;
    };
  };
}

export async function fetchSmithsonianFolkways(): Promise<FolkMusicEntry[]> {
  if (!API_KEY) {
    console.warn("Smithsonian API key not configured. Skipping Smithsonian data.");
    return [];
  }

  try {
    const response = await fetch(
      `${SMITHSONIAN_API}/search?q=folk+music+audio&api_key=${API_KEY}&rows=50`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Smithsonian API error: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.response?.rows as SmithsonianRow[];

    if (!rows) return [];

    return rows
      .filter((row) => row.content?.indexedStructured?.object_type?.some(
        (type) => type.toLowerCase().includes("sound") || type.toLowerCase().includes("audio")
      ))
      .map((row) => mapSmithsonianToEntry(row));
  } catch (error) {
    console.error("Failed to fetch from Smithsonian:", error);
    return [];
  }
}

function mapSmithsonianToEntry(row: SmithsonianRow): FolkMusicEntry {
  const content = row.content;
  const indexed = content?.indexedStructured;
  const title = content?.descriptiveNonRepeating?.title?.content || row.title;
  const place = indexed?.place?.[0] || "";
  const culture = indexed?.culture?.[0] || "";
  const date = indexed?.date?.[0];
  const year = date ? parseInt(date) : undefined;
  const era = getEraFromYear(year);
  const region = getRegionFromPlace(place, culture);
  
  const notes = content?.freetext?.notes?.[0]?.content || "";
  const physicalDesc = content?.freetext?.physicalDescription?.[0]?.content || "";
  const description = notes || physicalDesc || `Traditional music from the Smithsonian Folkways collection.`;

  return {
    id: `smithsonian-${row.id}`,
    title,
    artist: culture || "Traditional Artists",
    region,
    country: place || "Unknown",
    era,
    year,
    tags: indexed?.topic?.slice(0, 5) || ["folk", "traditional"],
    description,
    media: [],
  };
}

function getEraFromYear(year?: number): string {
  if (!year) return "Traditional";
  if (year < 1000) return "Ancient";
  if (year < 1500) return "Medieval";
  if (year < 1600) return "16th Century";
  if (year < 1700) return "17th Century";
  if (year < 1800) return "18th Century";
  if (year < 1900) return "19th Century";
  if (year < 2000) return "20th Century";
  return "21st Century";
}

function getRegionFromPlace(place: string, culture: string): string {
  const text = `${place} ${culture}`.toLowerCase();
  
  if (text.includes("europe") || text.includes("british") || text.includes("irish") || text.includes("french")) 
    return "Western Europe";
  if (text.includes("africa") && !text.includes("north")) 
    return "Sub-Saharan Africa";
  if (text.includes("north africa") || text.includes("egypt") || text.includes("morocco")) 
    return "North Africa";
  if (text.includes("india") || text.includes("pakistan") || text.includes("nepal")) 
    return "South Asia";
  if (text.includes("china") || text.includes("japan") || text.includes("korea")) 
    return "East Asia";
  if (text.includes("america") || text.includes("united states") || text.includes("canada")) 
    return "North America";
  if (text.includes("mexico") || text.includes("central america")) 
    return "Central America";
  if (text.includes("brazil") || text.includes("argentina") || text.includes("south america")) 
    return "South America";
  if (text.includes("australia") || text.includes("oceania") || text.includes("pacific")) 
    return "Oceania";
  
  return "Global";
}
