import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchStatsStart } from '../store/slices/songSlice';
import { Music, Users, Disc, Tag } from 'lucide-react';

const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 0;
  }
`;

const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
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

const SectionLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  width: 100%;
`;

const GenrePill = styled.div`
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: #333;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);

  .count {
    background: #f97316;
    color: #fff;
    padding: 2px 8px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 700;
  }
`;

interface DashboardProps {
  onNavigateToSearch?: (searchTerm: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToSearch }) => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  if (loading || !stats) {
    return <div style={{ padding: '40px', color: '#666' }}>Loading Dashboard...</div>;
  }

  return (
    <div>
      <Topbar>
        <h2>Dashboard</h2>
      </Topbar>

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

      <SectionLabel>Songs by Genre</SectionLabel>
      <GenreList>
        {stats.songsPerGenre.map((g) => (
          <GenrePill key={g.genre}>
            {g.genre}
            <span className="count">{g.count}</span>
          </GenrePill>
        ))}
      </GenreList>

      <SectionLabel>Artist Statistics</SectionLabel>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {stats.songsAndAlbumsPerArtist.map((a) => (
          <div 
            key={a.artist} 
            onClick={() => onNavigateToSearch && onNavigateToSearch(a.artist)}
            style={{ padding: '12px', background: '#f9f9f9', border: '1px solid #e5e5e5', borderRadius: '6px', minWidth: '180px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>{a.artist}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Songs: {a.songCount} | Albums: {a.albumCount}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Album Statistics</SectionLabel>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {stats.songsPerAlbum.map((a) => (
          <div 
            key={`${a.album}-${a.artist}`} 
            onClick={() => onNavigateToSearch && onNavigateToSearch(a.album)}
            style={{ padding: '12px', background: '#f9f9f9', border: '1px solid #e5e5e5', borderRadius: '6px', minWidth: '180px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>{a.album}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{a.artist}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888' }}>Songs: {a.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
