import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, SongFormData, StatisticsData, FilterState, NotificationState } from '../../types/song';

interface SongState {
  songs: Song[];
  stats: StatisticsData | null;
  loading: boolean;
  statsLoading: boolean;
  submitting: boolean;
  error: string | null;
  filters: FilterState;
  selectedSong: Song | null;
  isModalOpen: boolean;
  notification: NotificationState;
}

const initialFilters: FilterState = {
  search: '',
  genre: 'All',
  artist: 'All',
  album: 'All',
};

const initialState: SongState = {
  songs: [],
  stats: null,
  loading: false,
  statsLoading: false,
  submitting: false,
  error: null,
  filters: initialFilters,
  selectedSong: null,
  isModalOpen: false,
  notification: {
    message: '',
    type: 'info',
    visible: false,
  },
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch Songs Actions
    fetchSongsStart(state, _action: PayloadAction<FilterState | undefined>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch Stats Actions
    fetchStatsStart(state) {
      state.statsLoading = true;
    },
    fetchStatsSuccess(state, action: PayloadAction<StatisticsData>) {
      state.statsLoading = false;
      state.stats = action.payload;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.statsLoading = false;
      state.error = action.payload;
    },

    // Add Song Actions
    addSongStart(state, _action: PayloadAction<SongFormData>) {
      state.submitting = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.submitting = false;
      state.isModalOpen = false;
      state.songs.unshift(action.payload);
      state.notification = {
        message: `"${action.payload.title}" added successfully!`,
        type: 'success',
        visible: true,
      };
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.error = action.payload;
      state.notification = {
        message: action.payload || 'Failed to add song',
        type: 'error',
        visible: true,
      };
    },

    // Update Song Actions
    updateSongStart(state, _action: PayloadAction<{ id: string; songData: SongFormData }>) {
      state.submitting = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.submitting = false;
      state.isModalOpen = false;
      state.selectedSong = null;
      const index = state.songs.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.notification = {
        message: `"${action.payload.title}" updated successfully!`,
        type: 'success',
        visible: true,
      };
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.error = action.payload;
      state.notification = {
        message: action.payload || 'Failed to update song',
        type: 'error',
        visible: true,
      };
    },

    // Delete Song Actions
    deleteSongStart(state, _action: PayloadAction<string>) {
      // Don't set loading=true here to avoid unmounting the whole grid!
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((s) => s._id !== action.payload);
      state.notification = {
        message: 'Song removed successfully!',
        type: 'success',
        visible: true,
      };
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.notification = {
        message: action.payload || 'Failed to delete song',
        type: 'error',
        visible: true,
      };
    },

    // Seed Data Actions
    seedDatabaseStart(state) {
      state.loading = true;
    },

    // Filter Reducers
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },

    // Modal & Selection Controls
    openAddModal(state) {
      state.selectedSong = null;
      state.isModalOpen = true;
    },
    openEditModal(state, action: PayloadAction<Song>) {
      state.selectedSong = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedSong = null;
    },

    // Notifications
    hideNotification(state) {
      state.notification.visible = false;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  seedDatabaseStart,
  setFilters,
  resetFilters,
  openAddModal,
  openEditModal,
  closeModal,
  hideNotification,
} = songSlice.actions;

export default songSlice.reducer;
