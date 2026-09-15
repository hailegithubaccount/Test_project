import { Request, Response } from 'express';
import { SongService } from '../services/songService';

// Create a new song
export const createSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, artist, album, genre } = req.body;

    if (!title || !artist || !album || !genre) {
      res.status(400).json({ message: 'Title, artist, album, and genre are required fields.' });
      return;
    }

    const song = await SongService.createSong({ title, artist, album, genre });
    res.status(201).json(song);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to create song' });
  }
};

// Get all songs with optional filters and search
export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre, artist, album, search } = req.query;

    const songs = await SongService.getSongs({
      genre: typeof genre === 'string' ? genre : undefined,
      artist: typeof artist === 'string' ? artist : undefined,
      album: typeof album === 'string' ? album : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.status(200).json(songs);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch songs' });
  }
};

// Get a single song by ID
export const getSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const song = await SongService.getSongById(id);

    if (!song) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    res.status(200).json(song);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch song' });
  }
};

// Update an existing song
export const updateSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre } = req.body;

    const updatedSong = await SongService.updateSong(id, { title, artist, album, genre });

    if (!updatedSong) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    res.status(200).json(updatedSong);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to update song' });
  }
};

// Delete a song
export const deleteSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedSong = await SongService.deleteSong(id);

    if (!deletedSong) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    res.status(200).json({ message: 'Song deleted successfully', id });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to delete song' });
  }
};

// Get aggregated statistics
export const getSongStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await SongService.getSongStats();
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch statistics' });
  }
};
