export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface GenreStat {
  genre: string;
  count: number;
}

export interface ArtistStat {
  artist: string;
  songCount: number;
  albumCount: number;
  albums?: string[];
}

export interface AlbumStat {
  album: string;
  artist: string;
  genre: string;
  count: number;
}

export interface StatsTotals {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

export interface StatisticsData {
  totals: StatsTotals;
  songsPerGenre: GenreStat[];
  songsAndAlbumsPerArtist: ArtistStat[];
  songsPerAlbum: AlbumStat[];
  genresList: string[];
  artistsList: string[];
  albumsList: string[];
}

export interface FilterState {
  search: string;
  genre: string;
  artist: string;
  album: string;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}
