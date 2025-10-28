import { FolkMusicEntry } from "@/types/music";
import { SAMPLE_FOLK_ENTRIES } from "@/constants/sampleData";

const MUSICBRAINZ_API = "https://musicbrainz.org/ws/2";
const COVERART_API = "https://coverartarchive.org";
const USER_AGENT = "Mayagaan/1.0 (https://mayagaan.app)";

interface MusicBrainzArtist {
  id: string;
  name: string;
  type?: string;
  country?: string;
  "life-span"?: {
    begin?: string;
    end?: string;
  };
  tags?: Array<{ name: string; count: number }>;
  disambiguation?: string;
}

export async function fetchFolkMusic(): Promise<FolkMusicEntry[]> {
  try {
    const response = await fetch(
      `${MUSICBRAINZ_API}/artist/?query=tag:folk%20AND%20(tag:traditional%20OR%20tag:world)&fmt=json&limit=100`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`MusicBrainz API error: ${response.status}`);
    }

    const data = await response.json();
    const artists = data.artists as MusicBrainzArtist[];

    // Filter out "Various Artists" and compilation entries
    const filteredArtists = artists.filter(
      (artist) =>
        artist.id !== "89ad4ac3-39f7-470e-963a-56509c546377" && // Various Artists ID
        !artist.name.toLowerCase().includes("various") &&
        !artist.name.toLowerCase().includes("compilation") &&
        artist.type !== "Other"
    );

    return filteredArtists
      .slice(0, 50)
      .map((artist) => mapArtistToEntry(artist));
  } catch (error) {
    console.error("Failed to fetch from MusicBrainz, using sample data:", error);
    return SAMPLE_FOLK_ENTRIES;
  }
}

async function fetchCoverArt(artistId: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${COVERART_API}/release-group/${artistId}`, {
      headers: { Accept: "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.images?.[0]?.thumbnails?.small || data.images?.[0]?.image;
    }
  } catch (error) {
    // Silently fail - cover art is optional
  }
  return undefined;
}

function mapArtistToEntry(artist: MusicBrainzArtist): FolkMusicEntry {
  const beginYear = artist["life-span"]?.begin
    ? parseInt(artist["life-span"].begin.split("-")[0])
    : undefined;
  
  const era = getEraFromYear(beginYear);
  const region = getRegionFromCountry(artist.country);
  const tags = artist.tags?.slice(0, 5).map((t) => t.name) || ["folk"];

  return {
    id: artist.id,
    title: artist.name,
    artist: artist.name,
    region,
    country: artist.country || "Unknown",
    era,
    year: beginYear,
    tags,
    description: artist.disambiguation || `${artist.name} - Folk and traditional music artist from ${artist.country || "various regions"}.`,
    media: [],
    imageUrl: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(artist.name)}.jpg?width=300`,
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

function getRegionFromCountry(country?: string): string {
  if (!country) return "Global";
  
  const regionMap: { [key: string]: string } = {
    IE: "Western Europe",
    GB: "Western Europe",
    FR: "Western Europe",
    DE: "Western Europe",
    ES: "Western Europe",
    IT: "Western Europe",
    US: "North America",
    CA: "North America",
    MX: "Central America",
    BR: "South America",
    AR: "South America",
    IN: "South Asia",
    PK: "South Asia",
    NP: "South Asia",
    CN: "East Asia",
    JP: "East Asia",
    KR: "East Asia",
    ZA: "Sub-Saharan Africa",
    NG: "Sub-Saharan Africa",
    EG: "North Africa",
    MA: "North Africa",
    AU: "Oceania",
    NZ: "Oceania",
  };

  return regionMap[country] || "Global";
}
