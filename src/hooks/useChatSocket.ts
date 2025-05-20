import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../features/chat/chatSlice';

export const useChatSocket = (roomId: string, currentUserId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomId || !currentUserId) return;

    const socket = io('http://localhost:5000', { withCredentials: true });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Socket Connected]', socket.id);
      socket.emit('join-room', { roomId });
    });

    socket.on('receive-message', (data: { from: string; message: string; displayName: string }) => {
      if (data.from !== currentUserId) {
        dispatch(addMessage({ from: data.displayName, message: data.message }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, currentUserId, dispatch]);

  const sendMessage = (from: string, message: string, displayName: string) => {
    socketRef.current?.emit('send-message', { roomId, from, message, displayName });
  };

  return { sendMessage };
};
