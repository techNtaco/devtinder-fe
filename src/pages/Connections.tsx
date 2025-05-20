import { useEffect, useState } from "react";
import axios from "axios";
import { MatchItem } from "../types/match";
import { BASE_API_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Connections = () => {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/request/matches`, {
          withCredentials: true,
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleChatClick = (user: MatchItem['user']) => {
    if (!currentUser) return;

    navigate(`/chat/${user.id}`, {
      state: {
        currentUser,
        chatUser: user,
      },
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-500">You have no matches yet.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map(({ user, matchedAt }) => (
            <li
              key={`${user.id}-${matchedAt}`}
              className="p-4 bg-base-100 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 mb-2">
                  Matched on {new Date(matchedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleChatClick(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg"
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
