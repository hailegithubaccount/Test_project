import React from 'react';
import styled from '@emotion/styled';
import { Play, SkipBack, SkipForward, Volume2, Maximize2, Shuffle, Repeat } from 'lucide-react';

const PlaybackContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #ffffff;
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 250px;
  
  .time {
    font-size: 12px;
    font-weight: 500;
  }
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 600px;
  gap: 12px;

  .controls {
    display: flex;
    align-items: center;
    gap: 24px;

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: ${(props) => props.theme.colors.textPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.04);
      
      &:hover {
        background: rgba(0,0,0,0.08);
      }
    }
  }

  .progress-container {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    
    .timeline {
      width: 100%;
      height: 4px;
      background: rgba(0,0,0,0.1);
      border-radius: 2px;
      position: relative;

      .filled {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 30%;
        background: ${(props) => props.theme.colors.primary};
        border-radius: 2px;
      }
      
      .handle {
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background: ${(props) => props.theme.colors.primary};
        border-radius: 50%;
      }
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  width: 250px;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textPrimary};
    
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const PlaybackBar: React.FC = () => {
  return (
    <PlaybackContainer>
      <LeftSection>
        <span className="time">0:00:00</span>
      </LeftSection>

      <CenterSection>
        <div className="progress-container">
          <div className="timeline">
            <div className="filled"></div>
            <div className="handle"></div>
          </div>
        </div>
        <div className="controls">
          <button><Shuffle size={16} /></button>
          <button><SkipBack size={20} /></button>
          <button className="play-btn"><Play size={20} fill="currentColor" /></button>
          <button><SkipForward size={20} /></button>
          <button><Repeat size={16} /></button>
        </div>
      </CenterSection>

      <RightSection>
        <button><Volume2 size={20} /></button>
        <button><Maximize2 size={18} /></button>
        <button>...</button>
      </RightSection>
    </PlaybackContainer>
  );
};
