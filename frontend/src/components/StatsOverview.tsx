import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchStatsStart } from '../store/slices/songSlice';
import { Music, Mic2, Disc, Tag } from 'lucide-react';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  scroll-margin-top: 100px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const IconWrapper = styled.div<{ bg: string; color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValueArea = styled.div`
  h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: ${(props) => props.theme.colors.textPrimary};
  }
  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.textSecondary};
    margin: 4px 0 0 0;
  }
`;

const PercentageArea = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.positive ? '#05cd99' : '#ee5d50')};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SparklineMock = styled.div<{ color: string }>`
  height: 40px;
  width: 100%;
  margin-top: 8px;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: ${(props) => props.color};
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    filter: drop-shadow(0px 4px 6px ${(props) => props.color}30);
  }
`;

export const StatsOverview: React.FC = () => {
  const dispatch = useDispatch();
  const { stats, statsLoading } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  if (statsLoading || !stats) {
    return (
      <StatsContainer>
        {[1,2,3,4].map(i => <MetricCard key={i}>Loading...</MetricCard>)}
      </StatsContainer>
    );
  }

  const MockGraph = ({ color }: { color: string }) => (
    <SparklineMock color={color}>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none">
        <path d="M0,25 Q10,15 20,20 T40,10 T60,15 T80,5 T100,0" />
      </svg>
    </SparklineMock>
  );

  return (
    <StatsContainer id="home">
      <MetricCard>
        <MetricHeader>
          <IconWrapper bg="rgba(67, 24, 255, 0.1)" color="#4318ff">
            <Music size={24} />
          </IconWrapper>
          <PercentageArea positive>↑ 12%</PercentageArea>
        </MetricHeader>
        <ValueArea>
          <h2>{stats.totals.totalSongs}</h2>
          <p>Total Songs</p>
        </ValueArea>
        <MockGraph color="#4318ff" />
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <IconWrapper bg="rgba(5, 205, 153, 0.1)" color="#05cd99">
            <Mic2 size={24} />
          </IconWrapper>
          <PercentageArea positive>↑ 8%</PercentageArea>
        </MetricHeader>
        <ValueArea>
          <h2>{stats.totals.totalArtists}</h2>
          <p>Artists</p>
        </ValueArea>
        <MockGraph color="#05cd99" />
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <IconWrapper bg="rgba(238, 93, 80, 0.1)" color="#ee5d50">
            <Disc size={24} />
          </IconWrapper>
          <PercentageArea positive>↑ 15%</PercentageArea>
        </MetricHeader>
        <ValueArea>
          <h2>{stats.totals.totalAlbums}</h2>
          <p>Albums</p>
        </ValueArea>
        <MockGraph color="#ee5d50" />
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <IconWrapper bg="rgba(255, 181, 71, 0.1)" color="#ffb547">
            <Tag size={24} />
          </IconWrapper>
          <PercentageArea positive>↑ 5%</PercentageArea>
        </MetricHeader>
        <ValueArea>
          <h2>{stats.totals.totalGenres}</h2>
          <p>Genres</p>
        </ValueArea>
        <MockGraph color="#ffb547" />
      </MetricCard>
    </StatsContainer>
  );
};
