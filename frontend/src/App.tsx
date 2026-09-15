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

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 220px; /* Width of sidebar on desktop */
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0; /* Full width on mobile */
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
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <ContentWrapper>
          <MainContent>
            {activeView === 'dashboard' ? (
              <Dashboard onNavigateToSearch={handleNavigateToSearch} />
            ) : (
              <SongList initialSearch={initialSearch} />
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
