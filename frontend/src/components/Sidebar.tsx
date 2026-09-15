import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Home, Menu, X } from 'lucide-react';

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

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 7px 12px;
  margin: 0 12px 16px 12px;
  gap: 8px;

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 13px;
    width: 100%;
    color: ${(props) => props.theme.colors.textPrimary};

    &::placeholder {
      color: ${(props) => props.theme.colors.textSecondary};
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

// ── Hamburger button visible only on mobile ──────────────────────────────────
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
  onToggle?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay closes sidebar on mobile tap-outside */}
      <Overlay open={open} onClick={() => setOpen(false)} />

      {/* Floating hamburger button for mobile */}
      <HamburgerButton
        id="hamburger-btn"
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
            <h1>Media Player</h1>
          </div>
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </HeaderArea>

        <SearchBox>
          <input type="text" placeholder="Search" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </SearchBox>

        <NavList>
          <NavItem active>
            <div className="content">
              <Home size={18} strokeWidth={2.5} /> Home
            </div>
          </NavItem>
        </NavList>
      </SidebarContainer>
    </>
  );
};
