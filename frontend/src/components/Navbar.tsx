import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { openAddModal } from '../store/slices/songSlice';
import { Music, Plus, Database, Sparkles, BarChart2 } from 'lucide-react';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 32px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f97316;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: #f8fafc;
  margin: 0;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: #fb923c;
  }
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${(props) =>
    props.variant === 'secondary'
      ? `
    background: rgba(255, 255, 255, 0.06);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.1);
    &:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }
  `
      : `
    background: #f97316;
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    }
  `}

  @media (max-width: 640px) {
    padding: 8px 12px;
    font-size: 13px;
    span {
      display: none;
    }
  }
`;

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state: RootState) => state.songs);

  return (
    <Header>
      <NavContainer>
        <LogoSection>
          <LogoIcon>
            <Music size={24} />
          </LogoIcon>
          <div>
            <Title>
              Melody<span>Hub</span>
            </Title>
            <Subtitle>
              MERN Music Library & Analytics Dashboard ({stats?.totals.totalSongs || 0} Songs)
            </Subtitle>
          </div>
        </LogoSection>

        <ActionsGroup>


          <Button variant="primary" onClick={() => dispatch(openAddModal())}>
            <Plus size={18} />
            <span>Add New Song</span>
          </Button>
        </ActionsGroup>
      </NavContainer>
    </Header>
  );
};
