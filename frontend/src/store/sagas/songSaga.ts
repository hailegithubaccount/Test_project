import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
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
} from '../slices/songSlice';
import {
  fetchSongsApi,
  fetchSongStatsApi,
  createSongApi,
  updateSongApi,
  deleteSongApi,
  seedDatabaseApi,
} from '../../services/api';
import { Song, SongFormData, StatisticsData, FilterState } from '../../types/song';

// Selector to get current filters from state
const getFiltersState = (state: any): FilterState => state.songs.filters;

function* handleFetchSongs(action: PayloadAction<FilterState | undefined>): Generator<any, void, any> {
  try {
    const filters: FilterState = action.payload || (yield select(getFiltersState));
    const songs: Song[] = yield call(fetchSongsApi, filters);
    yield put(fetchSongsSuccess(songs));
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error fetching songs';
    yield put(fetchSongsFailure(errorMsg));
  }
}

function* handleFetchStats(): Generator<any, void, any> {
  try {
    const stats: StatisticsData = yield call(fetchSongStatsApi);
    yield put(fetchStatsSuccess(stats));
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error fetching statistics';
    yield put(fetchStatsFailure(errorMsg));
  }
}

function* handleAddSong(action: PayloadAction<SongFormData>): Generator<any, void, any> {
  try {
    const newSong: Song = yield call(createSongApi, action.payload);
    yield put(addSongSuccess(newSong));
    // Re-fetch stats automatically for live updates
    yield put(fetchStatsStart());
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error adding song';
    yield put(addSongFailure(errorMsg));
  }
}

function* handleUpdateSong(
  action: PayloadAction<{ id: string; songData: SongFormData }>
): Generator<any, void, any> {
  try {
    const updatedSong: Song = yield call(updateSongApi, action.payload.id, action.payload.songData);
    yield put(updateSongSuccess(updatedSong));
    // Re-fetch stats automatically for live updates
    yield put(fetchStatsStart());
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error updating song';
    yield put(updateSongFailure(errorMsg));
  }
}

function* handleDeleteSong(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
    // Re-fetch stats automatically for live updates
    yield put(fetchStatsStart());
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error deleting song';
    yield put(deleteSongFailure(errorMsg));
  }
}

function* handleSeedDatabase(): Generator<any, void, any> {
  try {
    yield call(seedDatabaseApi);
    yield put(fetchSongsStart());
    yield put(fetchStatsStart());
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Error seeding database';
    yield put(fetchSongsFailure(errorMsg));
  }
}

// Watcher Sagas
export function* songSaga() {
  yield takeLatest(fetchSongsStart.type, handleFetchSongs);
  yield takeLatest(fetchStatsStart.type, handleFetchStats);
  yield takeLatest(addSongStart.type, handleAddSong);
  yield takeLatest(updateSongStart.type, handleUpdateSong);
  yield takeLatest(deleteSongStart.type, handleDeleteSong);
  yield takeLatest(seedDatabaseStart.type, handleSeedDatabase);
  // Refetch when filters change
  yield takeLatest([setFilters.type, resetFilters.type], handleFetchSongs);
}
