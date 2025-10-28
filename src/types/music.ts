export interface FolkMusicEntry {
  id: string;
  title: string;
  artist: string;
  region: string;
  country: string;
  era: string;
  year?: number;
  tags: string[];
  description: string;
  audio?: string;
  media: string[];
  imageUrl?: string;
}

export interface FilterState {
  query: string;
  region: string;
  era: string;
  tags: string[];
  sortBy: 'relevance' | 'newest' | 'era' | 'region';
}
