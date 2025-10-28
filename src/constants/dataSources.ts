export interface DataSource {
  name: string;
  type: string;
  description: string;
  url: string;
  ethicalNotes: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    name: "MusicBrainz",
    type: "API",
    description: "Folk-tagged metadata, comprehensive artist information",
    url: "https://musicbrainz.org/doc/MusicBrainz_API",
    ethicalNotes: "Attribute sources; rate limits apply. Open data community project.",
  },
  {
    name: "Cover Art Archive",
    type: "API",
    description: "Artist and album images linked to MusicBrainz",
    url: "https://coverartarchive.org",
    ethicalNotes: "Open access; linked to MusicBrainz entries.",
  },
  {
    name: "Library of Congress",
    type: "Archive",
    description: "Public domain folk audio recordings from around the world",
    url: "https://www.loc.gov/audio/",
    ethicalNotes: "Free for non-commercial use; respect cultural origins and provide attribution.",
  },
  {
    name: "Smithsonian Folkways",
    type: "Archive",
    description: "UNESCO traditional music recordings and cultural documentation",
    url: "https://folkways.si.edu/unesco",
    ethicalNotes: "Educational use; attribution required. Preserves cultural heritage.",
  },
  {
    name: "Kaggle Folk Datasets",
    type: "Static Dataset",
    description: "Global melodies including Chinese folk, African rhythms, and more",
    url: "https://www.kaggle.com/datasets/ziya07/traditional-chinese-folk-music-composition-dataset",
    ethicalNotes: "Cite datasets; ensure cultural diversity and representation in usage.",
  },
];
