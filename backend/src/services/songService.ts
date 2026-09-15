import { Song, ISong } from '../models/Song';

export interface CreateSongDTO {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface UpdateSongDTO {
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
}

export interface SongFilters {
  genre?: string;
  artist?: string;
  album?: string;
  search?: string;
}

export class SongService {
  /**
   * Create a new song document in database
   */
  static async createSong(data: CreateSongDTO): Promise<ISong> {
    return await Song.create({
      title: data.title.trim(),
      artist: data.artist.trim(),
      album: data.album.trim(),
      genre: data.genre.trim(),
    });
  }

  /**
   * Fetch songs matching optional query filters and search keyword
   */
  static async getSongs(filters: SongFilters): Promise<ISong[]> {
    const query: any = {};

    if (filters.genre && filters.genre !== 'All') {
      query.genre = { $regex: new RegExp(`^${filters.genre}$`, 'i') };
    }

    if (filters.artist && filters.artist !== 'All') {
      query.artist = { $regex: new RegExp(`^${filters.artist}$`, 'i') };
    }

    if (filters.album && filters.album !== 'All') {
      query.album = { $regex: new RegExp(`^${filters.album}$`, 'i') };
    }

    if (filters.search && filters.search.trim() !== '') {
      const searchRegex = new RegExp(filters.search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { artist: searchRegex },
        { album: searchRegex },
        { genre: searchRegex },
      ];
    }

    return await Song.find(query).sort({ createdAt: -1 });
  }

  /**
   * Fetch a single song by MongoDB ObjectId
   */
  static async getSongById(id: string): Promise<ISong | null> {
    return await Song.findById(id);
  }

  /**
   * Update song details by ID
   */
  static async updateSong(id: string, data: UpdateSongDTO): Promise<ISong | null> {
    const song = await Song.findById(id);
    if (!song) return null;

    if (data.title !== undefined) song.title = data.title.trim();
    if (data.artist !== undefined) song.artist = data.artist.trim();
    if (data.album !== undefined) song.album = data.album.trim();
    if (data.genre !== undefined) song.genre = data.genre.trim();

    return await song.save();
  }

  /**
   * Delete a song by ID
   */
  static async deleteSong(id: string): Promise<ISong | null> {
    return await Song.findByIdAndDelete(id);
  }

  /**
   * Aggregate overall statistics:
   * - Total counts of songs, artists, albums, and genres
   * - Songs count per genre
   * - Songs & albums count per artist
   * - Songs count per album
   */
  static async getSongStats() {
    const totalSongs = await Song.countDocuments();
    
    const distinctArtists = await Song.distinct('artist');
    const totalArtists = distinctArtists.length;

    const distinctAlbums = await Song.distinct('album');
    const totalAlbums = distinctAlbums.length;

    const distinctGenres = await Song.distinct('genre');
    const totalGenres = distinctGenres.length;

    const songsPerGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $project: { genre: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    const songsAndAlbumsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          songCount: { $sum: 1 },
          albums: { $addToSet: '$album' }
        }
      },
      {
        $project: {
          artist: '$_id',
          songCount: 1,
          albumCount: { $size: '$albums' },
          albums: 1,
          _id: 0
        }
      },
      { $sort: { songCount: -1 } }
    ]);

    const songsPerAlbum = await Song.aggregate([
      {
        $group: {
          _id: { album: '$album', artist: '$artist' },
          count: { $sum: 1 },
          genre: { $first: '$genre' }
        }
      },
      {
        $project: {
          album: '$_id.album',
          artist: '$_id.artist',
          genre: 1,
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);

    return {
      totals: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres
      },
      songsPerGenre,
      songsAndAlbumsPerArtist,
      songsPerAlbum,
      genresList: distinctGenres.sort(),
      artistsList: distinctArtists.sort(),
      albumsList: distinctAlbums.sort()
    };
  }
}
