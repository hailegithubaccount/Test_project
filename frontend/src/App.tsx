import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { theme } from './theme';
import { fetchSongsStart } from './store/slices/songSlice';
import { Sidebar } from './components/Sidebar';
import { SongList } from './components/SongList';
import { Dashboard } from './components/Dashboard';
import { SongModal } from './components/SongModal';
import { Notification } from './components/Notification';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  color: #000000;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
`;

const ContentWrapper = styled.div<{ collapsed: boolean }>`
  flex: 1;
  margin-left: ${(props) => (props.collapsed ? '70px' : '220px')};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px 48px;
  max-width: 1600px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 56px; /* Space for the floating hamburger button */
  }
`;

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState<'dashboard' | 'songs'>('dashboard');
  const [initialSearch, setInitialSearch] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleNavigateToSearch = (searchTerm: string) => {
    setInitialSearch(searchTerm);
    setActiveView('songs');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
        <ContentWrapper collapsed={sidebarCollapsed}>
          <MainContent>
            {activeView === 'dashboard' ? (
              <Dashboard onNavigateToSearch={handleNavigateToSearch} />
            ) : (
              <SongList
                initialSearch={initialSearch}
                onBackToDashboard={() => {
                  setInitialSearch('');
                  setActiveView('dashboard');
                }}
              />
            )}
          </MainContent>
        </ContentWrapper>
        <SongModal />
        <Notification />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
