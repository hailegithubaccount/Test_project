import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { closeModal, addSongStart, updateSongStart } from '../store/slices/songSlice';
import { X, Music, Mic2, Disc, Tag, Save } from 'lucide-react';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

const ModalCard = styled.div<{ isOpen: boolean }>`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    padding: 18px;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #f97316;
  }
`;

const CloseButton = styled.button`
  background: #f3f3f3;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #555;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
    color: #111;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  align-items: center;
  gap: 6px;

  svg {
    color: #f97316;
  }
`;

const Input = styled.input`
  width: 100%;
  background: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px 14px;
  color: #111;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #f97316;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
`;

const SubmitButton = styled.button`
  background: #f97316;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: #f3f3f3;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #444;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
  }
`;

export const SongModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedSong, submitting } = useSelector((state: RootState) => state.songs);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedSong) {
      setFormData({
        title: selectedSong.title,
        artist: selectedSong.artist,
        album: selectedSong.album,
        genre: selectedSong.genre,
      });
    } else {
      setFormData({ title: '', artist: '', album: '', genre: '' });
    }
    setErrors({});
  }, [selectedSong, isModalOpen]);

  if (!isModalOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.artist.trim()) errs.artist = 'Artist is required';
    if (!formData.album.trim()) errs.album = 'Album is required';
    if (!formData.genre.trim()) errs.genre = 'Genre is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedSong) {
      dispatch(updateSongStart({ id: selectedSong._id, songData: formData }));
    } else {
      dispatch(addSongStart(formData));
    }
  };

  return (
    <Overlay isOpen={isModalOpen} onClick={() => dispatch(closeModal())}>
      <ModalCard isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <Music size={22} />
            {selectedSong ? 'Edit Song Details' : 'Add New Song'}
          </ModalTitle>
          <CloseButton onClick={() => dispatch(closeModal())}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <Music size={14} /> Title
            </Label>
            <Input
              type="text"
              placeholder="e.g. Blinding Lights"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>
              <Mic2 size={14} /> Artist
            </Label>
            <Input
              type="text"
              placeholder="e.g. The Weeknd"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            />
            {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>
              <Disc size={14} /> Album
            </Label>
            <Input
              type="text"
              placeholder="e.g. After Hours"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
            />
            {errors.album && <ErrorText>{errors.album}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>
              <Tag size={14} /> Genre
            </Label>
            <Input
              type="text"
              placeholder="e.g. Synthwave, Pop, Rock, Jazz..."
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            />
            {errors.genre && <ErrorText>{errors.genre}</ErrorText>}
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={() => dispatch(closeModal())}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={submitting}>
              <Save size={16} />
              {submitting ? 'Saving...' : selectedSong ? 'Update Song' : 'Save Song'}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ModalCard>
    </Overlay>
  );
};
