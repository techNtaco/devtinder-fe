import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useChatSocket } from '../hooks/useChatSocket';
import { addMessage } from '../features/chat/chatSlice';
import { RootState } from '../app/store';

interface UserMinimal {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface LocationState {
  currentUser: UserMinimal;
  chatUser: UserMinimal;
}

const ChatPage = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const chatUser = state?.chatUser;
  const currentUser = state?.currentUser;

  const [input, setInput] = useState('');
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  const getRoomId = (id1: string, id2: string) => {
    return [id1, id2].sort().join('-'); // deterministic order
  };

  const roomId = chatUser && currentUser ? getRoomId(chatUser._id, currentUser._id) : '';
  const { sendMessage } = useChatSocket(roomId, currentUser?._id || '');

  const handleSend = () => {
    console.log('[Sending Message]', { input, roomId, currentUser });
    if (!input.trim() || !roomId || !currentUser?._id) return;
    sendMessage(currentUser._id, input, currentUser.firstName);
    dispatch(addMessage({ from: 'You', message: input }));
    setInput('');
    console.log('[Sending]', {
      roomId,
      from: currentUser._id,
      message: input,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Chat with {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : 'User'}
      </h2>
      <div className="h-96 border rounded-lg overflow-y-scroll p-4 mb-4 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === 'You' ? 'text-right' : 'text-left'}`}>
            <span className="block font-medium">{msg.from}:</span>
            <span className="block">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
