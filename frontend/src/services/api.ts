import axios from 'axios';
import { Song, SongFormData, StatisticsData, FilterState } from '../types/song';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSongsApi = async (filters?: FilterState): Promise<Song[]> => {
  const params = new URLSearchParams();
  if (filters?.genre && filters.genre !== 'All') params.append('genre', filters.genre);
  if (filters?.artist && filters.artist !== 'All') params.append('artist', filters.artist);
  if (filters?.album && filters.album !== 'All') params.append('album', filters.album);
  if (filters?.search && filters.search.trim() !== '') params.append('search', filters.search);

  const response = await api.get<Song[]>(`/songs?${params.toString()}`);
  return response.data;
};

export const fetchSongStatsApi = async (): Promise<StatisticsData> => {
  const response = await api.get<StatisticsData>('/songs/stats');
  return response.data;
};

export const createSongApi = async (songData: SongFormData): Promise<Song> => {
  const response = await api.post<Song>('/songs', songData);
  return response.data;
};

export const updateSongApi = async (id: string, songData: SongFormData): Promise<Song> => {
  const response = await api.put<Song>(`/songs/${id}`, songData);
  return response.data;
};

export const deleteSongApi = async (id: string): Promise<{ message: string; id: string }> => {
  const response = await api.delete<{ message: string; id: string }>(`/songs/${id}`);
  return response.data;
};

export const seedDatabaseApi = async (): Promise<void> => {
  await api.post('/songs/seed');
};
