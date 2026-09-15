import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilters, resetFilters } from '../store/slices/songSlice';
import { Search, Filter, X } from 'lucide-react';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #f4f7fe;
  border-radius: 8px;
  padding: 0 16px;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
    background: #ffffff;
  }

  svg {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  input {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.textPrimary};
    outline: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.textSecondary};
    }
  }
`;

const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Select = styled.select`
  padding: 10px 16px;
  background: #f4f7fe;
  color: ${(props) => props.theme.colors.textPrimary};
  border: 1px solid transparent;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    background: #ffffff;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: transparent;
  color: ${(props) => props.theme.colors.textSecondary};
  border: 1px solid ${(props) => props.theme.colors.surfaceBorder};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fff0f0;
    color: #e53e3e;
    border-color: rgba(229, 62, 62, 0.3);
  }
`;

export const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, stats } = useSelector((state: RootState) => state.songs);

  const genres = stats?.totals.totalGenres ? stats.songsPerGenre.map((g) => g.genre) : [];

  return (
    <FilterContainer>
      <SearchInputContainer>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by song title, artist, album, or genre..."
          value={filters.search}
          onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
        />
      </SearchInputContainer>

      <SelectGroup>
        <Filter size={16} color="#a3aed0" />
        <Select
          value={filters.genre}
          onChange={(e) => dispatch(setFilters({ genre: e.target.value }))}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>

        {(filters.search || filters.genre) && (
          <ClearButton onClick={() => dispatch(resetFilters())}>
            <X size={16} /> Clear Filters
          </ClearButton>
        )}
      </SelectGroup>
    </FilterContainer>
  );
};
