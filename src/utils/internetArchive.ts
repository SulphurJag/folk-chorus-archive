import { FolkMusicEntry } from "@/types/music";

const ARCHIVE_API = "https://archive.org/advancedsearch.php";

interface ArchiveDoc {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  description?: string;
  subject?: string[];
  coverage?: string;
  collection?: string[];
}

export async function fetchInternetArchiveMusic(): Promise<FolkMusicEntry[]> {
  try {
    const query = 'collection:(georgeblood) AND mediatype:audio AND (folk OR traditional)';
    const response = await fetch(
      `${ARCHIVE_API}?q=${encodeURIComponent(query)}&fl[]=identifier,title,creator,date,description,subject,coverage,collection&rows=50&output=json`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Internet Archive API error: ${response.status}`);
    }

    const data = await response.json();
    const docs = data.response?.docs as ArchiveDoc[];

    if (!docs) return [];

    return docs
      .filter((doc) => doc.title && doc.identifier)
      .map((doc) => mapArchiveToEntry(doc));
  } catch (error) {
    console.error("Failed to fetch from Internet Archive:", error);
    return [];
  }
}

function mapArchiveToEntry(doc: ArchiveDoc): FolkMusicEntry {
  const artist = doc.creator || "Traditional Artists";
  const year = doc.date ? parseInt(doc.date) : undefined;
  const era = getEraFromYear(year);
  const region = getRegionFromCoverage(doc.coverage);
  const country = extractCountry(doc.coverage);

  // Internet Archive audio URL format
  const audioUrl = `https://archive.org/download/${doc.identifier}/${doc.identifier}.mp3`;

  return {
    id: `archive-${doc.identifier}`,
    title: doc.title,
    artist,
    region,
    country,
    era,
    year,
    tags: doc.subject?.slice(0, 5) || ["folk", "traditional"],
    description: doc.description || `Traditional folk recording from the Internet Archive collection.`,
    audio: audioUrl,
    media: [audioUrl],
    imageUrl: `https://archive.org/services/img/${doc.identifier}`,
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

function getRegionFromCoverage(coverage?: string): string {
  if (!coverage) return "Global";
  const loc = coverage.toLowerCase();
  
  if (loc.includes("europe") || loc.includes("british") || loc.includes("ireland") || loc.includes("france")) 
    return "Western Europe";
  if (loc.includes("africa") && !loc.includes("north")) 
    return "Sub-Saharan Africa";
  if (loc.includes("egypt") || loc.includes("morocco") || loc.includes("algeria")) 
    return "North Africa";
  if (loc.includes("india") || loc.includes("pakistan") || loc.includes("bangladesh")) 
    return "South Asia";
  if (loc.includes("china") || loc.includes("japan") || loc.includes("korea")) 
    return "East Asia";
  if (loc.includes("united states") || loc.includes("canada") || loc.includes("america")) 
    return "North America";
  if (loc.includes("mexico") || loc.includes("guatemala") || loc.includes("central")) 
    return "Central America";
  if (loc.includes("brazil") || loc.includes("argentina") || loc.includes("south america")) 
    return "South America";
  if (loc.includes("australia") || loc.includes("new zealand") || loc.includes("pacific")) 
    return "Oceania";
  
  return "Global";
}

function extractCountry(coverage?: string): string {
  if (!coverage) return "Unknown";
  // Extract country from coverage string
  const parts = coverage.split(/[,;]/);
  return parts[0]?.trim() || "Unknown";
}
