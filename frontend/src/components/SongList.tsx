import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteSongStart, openEditModal, openAddModal, fetchStatsStart, setFilters } from '../store/slices/songSlice';
import { Song } from '../types/song';
import { Music, Edit3, Trash2, Plus, Search, Users, Disc, Tag, TrendingUp } from 'lucide-react';

// ── Topbar ──────────────────────────────────────────────────────────────────
const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 12px;
  flex-wrap: wrap;

  h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    flex-shrink: 0;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    h2 { font-size: 22px; }

    .right {
      flex-direction: column;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px;
  padding: 8px 14px;
  gap: 8px;
  width: 240px;

  @media (max-width: 600px) {
    width: 100%;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    width: 100%;
    color: #000;

    &::placeholder {
      color: #666;
    }
  }
`;

const GenreFilter = styled.select`
  padding: 8px 14px;
  background: #f3f3f3;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  color: #000;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background: #f97316;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #ea580c;
  }
`;

// ── Stats Strip ──────────────────────────────────────────────────────────────
const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const StatCard = styled.div`
  background: #f9f9f9;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;

  .icon {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .info {
    h3 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    p {
      margin: 2px 0 0 0;
      font-size: 12px;
      color: #666;
    }
  }
`;

// ── Section Header ───────────────────────────────────────────────────────────
const SectionLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`;

// ── Genre Breakdown ──────────────────────────────────────────────────────────
const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
`;

const GenrePill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f3f3;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 13px;

  .count {
    background: #f97316;
    color: #fff;
    padding: 1px 7px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
  }
`;

// ── Media Grid ───────────────────────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 14px;
  }

  @media (max-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const MediaCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  position: relative;

  .image-placeholder {
    width: 100%;
    aspect-ratio: 1;
    background: #f3f3f3;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    transition: background 0.15s ease;

    &:hover {
      background: #e8e8e8;
    }
  }

  .info {
    h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      margin: 2px 0 0 0;
      font-size: 12px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .actions {
    position: absolute;
    top: 6px;
    right: 6px;
    display: none;
    gap: 4px;
  }

  &:hover .actions {
    display: flex;
  }
`;

const IconButton = styled.button<{ danger?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.danger ? '#e53e3e' : '#333')};
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  &:hover {
    background: #fff;
  }
`;

export const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, stats, filters } = useSelector((state: RootState) => state.songs);

  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  if (loading) {
    return <div style={{ padding: '40px', color: '#666' }}>Loading...</div>;
  }

  // Filter songs based on search + genre
  const filteredSongs = songs.filter((song: Song) => {
    const q = search.toLowerCase();
    const matchesSearch =
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q);
    const matchesGenre = !genreFilter || song.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  const genres = stats?.songsPerGenre || [];
  const genreOptions = genres.map((g) => g.genre);

  return (
    <div>
      {/* ── Topbar ─────────────────────────────────────── */}
      <Topbar>
        <h2>Home</h2>
        <div className="right">
          <SearchBar>
            <Search size={14} color="#666" />
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBar>
          <GenreFilter value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">All Genres</option>
            {genreOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </GenreFilter>
          <AddButton onClick={() => dispatch(openAddModal())}>
            <Plus size={16} />
            Add New Song
          </AddButton>
        </div>
      </Topbar>

      {/* ── Statistics Strip ────────────────────────────── */}
      {stats && (
        <>
          <StatsStrip>
            <StatCard>
              <div className="icon" style={{ background: 'rgba(249,115,22,0.1)' }}>
                <Music size={22} color="#f97316" />
              </div>
              <div className="info">
                <h3>{stats.totals.totalSongs}</h3>
                <p>Total Songs</p>
              </div>
            </StatCard>
            <StatCard>
              <div className="icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Users size={22} color="#3b82f6" />
              </div>
              <div className="info">
                <h3>{stats.totals.totalArtists}</h3>
                <p>Artists</p>
              </div>
            </StatCard>
            <StatCard>
              <div className="icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
                <Disc size={22} color="#10b981" />
              </div>
              <div className="info">
                <h3>{stats.totals.totalAlbums}</h3>
                <p>Albums</p>
              </div>
            </StatCard>
            <StatCard>
              <div className="icon" style={{ background: 'rgba(139,92,246,0.1)' }}>
                <Tag size={22} color="#8b5cf6" />
              </div>
              <div className="info">
                <h3>{stats.totals.totalGenres}</h3>
                <p>Genres</p>
              </div>
            </StatCard>
          </StatsStrip>

          {/* ── Genre Breakdown ─────────────────────────── */}
          <SectionLabel>Songs by Genre</SectionLabel>
          <GenreList>
            {stats.songsPerGenre.map((g) => (
              <GenrePill key={g.genre}>
                {g.genre}
                <span className="count">{g.count}</span>
              </GenrePill>
            ))}
          </GenreList>
        </>
      )}

      {/* ── Song Grid ───────────────────────────────────── */}
      <SectionLabel>
        Recent media
        {search || genreFilter ? ` — ${filteredSongs.length} result${filteredSongs.length !== 1 ? 's' : ''}` : ''}
      </SectionLabel>
      <Grid>
        {filteredSongs.map((song: Song) => (
          <MediaCard key={song._id}>
            <div className="image-placeholder">
              <Music size={44} strokeWidth={1} />
            </div>
            <div className="info">
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
            <div className="actions">
              <IconButton
                title="Edit"
                onClick={(e) => { e.stopPropagation(); dispatch(openEditModal(song)); }}
              >
                <Edit3 size={13} />
              </IconButton>
              <IconButton
                danger
                title="Delete"
                onClick={(e) => { e.stopPropagation(); dispatch(deleteSongStart(song._id)); }}
              >
                <Trash2 size={13} />
              </IconButton>
            </div>
          </MediaCard>
        ))}
      </Grid>
    </div>
  );
};
