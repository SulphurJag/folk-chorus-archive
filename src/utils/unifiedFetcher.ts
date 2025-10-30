import { FolkMusicEntry } from "@/types/music";
import { fetchFolkMusic } from "./musicbrainz";
import { fetchLibraryOfCongressMusic } from "./libraryOfCongress";
import { fetchSmithsonianFolkways } from "./smithsonianFolkways";

export async function fetchAllFolkMusic(): Promise<FolkMusicEntry[]> {
  try {
    // Fetch from all sources in parallel
    const [musicBrainzData, locData, smithsonianData] = await Promise.all([
      fetchFolkMusic(),
      fetchLibraryOfCongressMusic(),
      fetchSmithsonianFolkways(),
    ]);

    // Combine all results
    const allEntries = [
      ...musicBrainzData,
      ...locData,
      ...smithsonianData,
    ];

    // Remove duplicates based on normalized title and artist
    const uniqueEntries = deduplicateEntries(allEntries);

    console.log(`Fetched ${uniqueEntries.length} unique folk music entries from ${
      [musicBrainzData.length > 0 && 'MusicBrainz',
       locData.length > 0 && 'Library of Congress',
       smithsonianData.length > 0 && 'Smithsonian Folkways'].filter(Boolean).join(', ')
    }`);

    return uniqueEntries;
  } catch (error) {
    console.error("Failed to fetch folk music from all sources:", error);
    return [];
  }
}

function deduplicateEntries(entries: FolkMusicEntry[]): FolkMusicEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = normalizeForDedup(entry.title, entry.artist);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeForDedup(title: string, artist: string): string {
  const normalize = (str: string) => 
    str.toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
  
  return `${normalize(title)}-${normalize(artist)}`;
}
