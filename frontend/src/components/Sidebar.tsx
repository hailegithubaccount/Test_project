import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Home, Menu, X, BarChart2, Library, ChevronLeft, ChevronRight } from 'lucide-react';

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

const SidebarContainer = styled.aside<{ open: boolean; collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? '70px' : '220px')};
  background: ${(props) => props.theme.colors.sidebar};
  color: ${(props) => props.theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
    width: 240px;
  }
`;

const HeaderArea = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? 'center' : 'space-between')};
  padding: 20px 14px 16px 14px;
  position: relative;

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      width: 28px;
      height: 28px;
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
      white-space: nowrap;
      display: ${(props) => (props.collapsed ? 'none' : 'block')};
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

const ToggleCollapseButton = styled.button<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #555;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #f97316;
    color: #ffffff;
    border-color: #f97316;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
  flex-grow: 1;
`;

const NavItem = styled.div<{ active?: boolean; collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? 'center' : 'flex-start')};
  padding: 10px ${(props) => (props.collapsed ? '0' : '12px')};
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#f97316' : props.theme.colors.textPrimary)};
  background: ${(props) => (props.active ? 'rgba(249, 115, 22, 0.08)' : 'transparent')};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  font-size: 14px;
  transition: all 0.2s ease;
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
      height: 18px;
      width: 3px;
      background: ${props.theme.colors.primary};
      border-radius: 4px;
    }
  `}

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #f97316;
  }

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
  }

  .label {
    display: ${(props) => (props.collapsed ? 'none' : 'inline')};
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
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
}) => {
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

      <SidebarContainer open={open} collapsed={collapsed}>
        <HeaderArea collapsed={collapsed}>
          <div className="brand">
            <div className="icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h1>SONG CRUD</h1>
          </div>
          <ToggleCollapseButton
            collapsed={collapsed}
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </ToggleCollapseButton>
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </HeaderArea>

        <NavList style={{ marginTop: '20px' }}>
          <NavItem
            active={activeView === 'dashboard'}
            collapsed={collapsed}
            title={collapsed ? 'Dashboard' : undefined}
            onClick={() => {
              onViewChange('dashboard');
              setOpen(false);
            }}
          >
            <div className="content">
              <BarChart2 size={18} strokeWidth={2.5} />
              <span className="label">Dashboard</span>
            </div>
          </NavItem>
          <NavItem
            active={activeView === 'songs'}
            collapsed={collapsed}
            title={collapsed ? 'Library' : undefined}
            onClick={() => {
              onViewChange('songs');
              setOpen(false);
            }}
          >
            <div className="content">
              <Library size={18} strokeWidth={2.5} />
              <span className="label">Library</span>
            </div>
          </NavItem>
        </NavList>
      </SidebarContainer>
    </>
  );
};


