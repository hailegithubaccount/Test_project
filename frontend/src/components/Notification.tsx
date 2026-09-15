import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { hideNotification } from '../store/slices/songSlice';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = styled.div<{ visible: boolean; type: string }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  background: ${(props) =>
    props.type === 'success'
      ? 'rgba(16, 185, 129, 0.95)'
      : props.type === 'error'
      ? 'rgba(239, 68, 68, 0.95)'
      : 'rgba(99, 102, 241, 0.95)'};
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transform: ${(props) => (props.visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: ${(props) => (props.theme as any).fonts?.body};
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 4px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.songs.notification);

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible, dispatch]);

  if (!notification.visible) return null;

  return (
    <ToastContainer visible={notification.visible} type={notification.type}>
      {notification.type === 'success' && <CheckCircle size={18} />}
      {notification.type === 'error' && <AlertCircle size={18} />}
      {notification.type === 'info' && <Info size={18} />}
      <span>{notification.message}</span>
      <CloseButton onClick={() => dispatch(hideNotification())}>
        <X size={16} />
      </CloseButton>
    </ToastContainer>
  );
};
