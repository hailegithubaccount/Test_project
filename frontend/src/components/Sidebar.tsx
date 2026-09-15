import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Home, Menu, X, BarChart2, Library } from 'lucide-react';

// ── Overlay behind sidebar on mobile ────────────────────────────────────────
const Overlay = styled.div<{ open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
`;

const SidebarContainer = styled.aside<{ open: boolean }>`
  width: 220px;
  background: ${(props) => props.theme.colors.sidebar};
  color: ${(props) => props.theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease;

  @media (max-width: 768px) {
    transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
    width: 240px;
  }
`;

const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 16px 16px;

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      width: 26px;
      height: 26px;
      background: ${(props) => props.theme.colors.primary};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    h1 {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
  }

  .close-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 4px;

    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
  flex-grow: 1;
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textPrimary};
  background: ${(props) => (props.active ? 'rgba(0,0,0,0.06)' : 'transparent')};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  font-size: 14px;
  transition: background 0.1s ease;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 16px;
      width: 3px;
      background: ${props.theme.colors.primary};
      border-radius: 4px;
    }
  `}

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    padding: 4px;
    flex-shrink: 0;
  }
`;

interface SidebarProps {
  activeView: 'dashboard' | 'songs';
  onViewChange: (view: 'dashboard' | 'songs') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Overlay open={open} onClick={() => setOpen(false)} />
      <HamburgerButton
        style={{
          position: 'fixed',
          top: '14px',
          left: '14px',
          zIndex: 200,
          display: open ? 'none' : undefined,
        }}
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </HamburgerButton>

      <SidebarContainer open={open}>
        <HeaderArea>
          <div className="brand">
            <div className="icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h1>SONG CRUD</h1>
          </div>
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </HeaderArea>

        <NavList style={{ marginTop: '20px' }}>
          <NavItem 
            active={activeView === 'dashboard'} 
            onClick={() => { onViewChange('dashboard'); setOpen(false); }}
          >
            <div className="content">
              <BarChart2 size={18} strokeWidth={2.5} /> Dashboard
            </div>
          </NavItem>
          <NavItem 
            active={activeView === 'songs'} 
            onClick={() => { onViewChange('songs'); setOpen(false); }}
          >
            <div className="content">
              <Library size={18} strokeWidth={2.5} /> Library
            </div>
          </NavItem>
        </NavList>
      </SidebarContainer>
    </>
  );
};

