import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openAddModal } from '../store/slices/songSlice';
import { Search, Plus, Bell, Database } from 'lucide-react';

const TopbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: #f4f7fe;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 99px;
  padding: 10px 24px;
  width: 400px;
  gap: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    width: 100%;
    color: ${(props) => props.theme.colors.textPrimary};
    
    &::placeholder {
      color: ${(props) => props.theme.colors.textSecondary};
    }
  }

  .shortcut {
    font-size: 11px;
    color: ${(props) => props.theme.colors.textSecondary};
    background: #f4f7fe;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  ${(props) =>
    props.primary
      ? `
    background: ${props.theme.colors.sidebar};
    color: #ffffff;
  `
      : `
    background: #ffffff;
    color: ${props.theme.colors.sidebar};
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  position: relative;

  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 6px;
    height: 6px;
    background: #ee5d50;
    border-radius: 50%;
  }
`;

export const Topbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <TopbarContainer>
      <SearchBox>
        <Search size={18} color="#a3aed0" />
        <input type="text" placeholder="Search by song title, artist, album, or genre..." />
        <div className="shortcut">Ctrl + K</div>
      </SearchBox>

      <ActionsContainer>

        <ActionButton primary onClick={() => dispatch(openAddModal())}>
          <Plus size={16} />
          Add New Song
        </ActionButton>

        <IconButton>
          <Bell size={20} />
          <div className="badge"></div>
        </IconButton>
        
        <IconButton style={{ background: '#4318ff', color: '#ffffff' }}>
          H
        </IconButton>
      </ActionsContainer>
    </TopbarContainer>
  );
};
