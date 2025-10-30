import { FolkMusicEntry } from "@/types/music";

const LOC_API = "https://www.loc.gov";
const USER_AGENT = "Mayagaan/1.0 (https://mayagaan.app)";

interface LOCResult {
  id: string;
  title: string;
  description?: string[];
  subject?: string[];
  contributor?: string[];
  date?: string;
  original_format?: string[];
  location?: string[];
  image_url?: string[];
  url?: string;
}

export async function fetchLibraryOfCongressMusic(): Promise<FolkMusicEntry[]> {
  try {
    const response = await fetch(
      `${LOC_API}/search/?q=folk+music+audio&fo=json&c=50&fa=original-format:sound+recording`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Library of Congress API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results as LOCResult[];

    return results
      .filter((result) => result.title && !result.title.toLowerCase().includes("collection"))
      .map((result) => mapLOCToEntry(result));
  } catch (error) {
    console.error("Failed to fetch from Library of Congress:", error);
    return [];
  }
}

function mapLOCToEntry(result: LOCResult): FolkMusicEntry {
  const artist = result.contributor?.[0] || "Unknown Artist";
  const year = result.date ? parseInt(result.date) : undefined;
  const era = getEraFromYear(year);
  const location = result.location?.[0] || "";
  const region = getRegionFromLocation(location);

  return {
    id: `loc-${result.id}`,
    title: result.title,
    artist,
    region,
    country: extractCountry(location),
    era,
    year,
    tags: result.subject?.slice(0, 5) || ["folk", "traditional"],
    description: result.description?.join(" ") || `Traditional folk recording from the Library of Congress collection.`,
    audio: result.url,
    media: result.url ? [result.url] : [],
    imageUrl: result.image_url?.[0] || undefined,
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

function getRegionFromLocation(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes("europe")) return "Western Europe";
  if (loc.includes("africa")) return "Sub-Saharan Africa";
  if (loc.includes("asia")) return "South Asia";
  if (loc.includes("america")) return "North America";
  if (loc.includes("united states")) return "North America";
  return "Global";
}

function extractCountry(location: string): string {
  if (!location) return "Unknown";
  const parts = location.split("--");
  return parts[parts.length - 1].trim() || "Unknown";
}
