import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteSongStart, openEditModal, openAddModal, fetchStatsStart, setFilters } from '../store/slices/songSlice';
import { Song } from '../types/song';
import { Music, Edit3, Trash2, Plus, Search, Users, Disc, Tag, TrendingUp, LayoutGrid, List, ArrowLeft } from 'lucide-react';

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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background: #f3f3f3;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #333;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f97316;
    color: #ffffff;
    border-color: #f97316;
    transform: translateX(-2px);
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

const ViewToggleGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px;
  padding: 2px;
  gap: 2px;
`;

const ViewToggleButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.active ? '#f97316' : '#666')};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: ${(props) => (props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none')};
  transition: all 0.15s ease;

  &:hover {
    color: #f97316;
  }
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

// ── Section Header ───────────────────────────────────────────────────────────
const SectionLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`;

// ── Media Grid ───────────────────────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
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
    z-index: 2;
  }

  &:hover .actions {
    display: flex;
  }
`;

// ── Media Row / List View ───────────────────────────────────────────────────
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SongRowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 4px;
  gap: 16px;

  .col-main {
    flex: 2;
    min-width: 0;
  }
  .col-album {
    flex: 1.5;
    @media (max-width: 640px) {
      display: none;
    }
  }
  .col-genre {
    flex: 1;
    @media (max-width: 480px) {
      display: none;
    }
  }
  .col-actions {
    width: 70px;
    text-align: right;
  }
`;

const SongRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  gap: 16px;
  transition: all 0.15s ease;

  &:hover {
    background: #f0f0f0;
    border-color: rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  }

  .song-main {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 2;
    min-width: 0;
  }

  .image-icon {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    background: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    flex-shrink: 0;
  }

  .title-artist {
    min-width: 0;
    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #111;
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

  .meta-album {
    flex: 1.5;
    font-size: 13px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 640px) {
      display: none;
    }
  }

  .meta-genre {
    flex: 1;

    span {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      background: rgba(249, 115, 22, 0.1);
      color: #f97316;
      border-radius: 4px;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }

  .row-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    width: 70px;
    flex-shrink: 0;
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

interface SongListProps {
  initialSearch?: string;
  onBackToDashboard?: () => void;
}

export const SongList: React.FC<SongListProps> = ({ initialSearch = '', onBackToDashboard }) => {
  const dispatch = useDispatch();
  const { songs, loading, stats } = useSelector((state: RootState) => state.songs);

  const [search, setSearch] = useState(initialSearch);
  const [genreFilter, setGenreFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('row');

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBackToDashboard && (
            <BackButton onClick={onBackToDashboard} title="Back to Dashboard">
              <ArrowLeft size={16} /> Back
            </BackButton>
          )}
          <h2>Library</h2>
        </div>
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
          <ViewToggleGroup>
            <ViewToggleButton
              active={viewMode === 'row'}
              onClick={() => setViewMode('row')}
              title="Row / List View"
            >
              <List size={16} />
            </ViewToggleButton>
            <ViewToggleButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </ViewToggleButton>
          </ViewToggleGroup>
          <AddButton onClick={() => dispatch(openAddModal())}>
            <Plus size={16} />
            Add New Song
          </AddButton>
        </div>
      </Topbar>

      {/* ── Display Media ────────────────────────────────── */}
      <SectionLabel>
        Recent media
        {search || genreFilter ? ` — ${filteredSongs.length} result${filteredSongs.length !== 1 ? 's' : ''}` : ''}
      </SectionLabel>

      {filteredSongs.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#888' }}>
          No songs found.
        </div>
      ) : viewMode === 'grid' ? (
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
      ) : (
        <ListContainer>
          <SongRowHeader>
            <div className="col-main">Title & Artist</div>
            <div className="col-album">Album</div>
            <div className="col-genre">Genre</div>
            <div className="col-actions">Actions</div>
          </SongRowHeader>
          {filteredSongs.map((song: Song) => (
            <SongRow key={song._id}>
              <div className="song-main">
                <div className="image-icon">
                  <Music size={20} strokeWidth={1.5} />
                </div>
                <div className="title-artist">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
              <div className="meta-album">{song.album || '—'}</div>
              <div className="meta-genre">
                <span>{song.genre}</span>
              </div>
              <div className="row-actions">
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
            </SongRow>
          ))}
        </ListContainer>
      )}
    </div>
  );
};

