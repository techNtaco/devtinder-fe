import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import UserCard from "../components/UserCard";
import MatchModal from "../components/MatchModal";
import { FeedUser } from "../types/feed";
import { setFeed, removeUserFromFeed } from "../features/feed/feedSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_API_URL } from '../utils/config';

const Home = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: RootState) => state.feed.users);
  const [matchModalVisible, setMatchModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await axios.get(`${BASE_API_URL}/users/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(res.data.feed));
    };
    fetchFeed();
  }, [dispatch]);

  const handleAction = async (action: "like" | "ignore", user: FeedUser) => {
    try {
      const res = await axios.post(
        `${BASE_API_URL}/request/${action}/${user._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.message === "It’s a Match!") {
        setMatchedUser(user.username);
        setMatchModalVisible(true);
      }

      dispatch(removeUserFromFeed(user._id));
    } catch (err) {
      console.error(`${action} failed`, err);
    }
  };

  const currentUser = feed[0];

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">DevTinder Feed</h2>

      <AnimatePresence mode="wait">
        {currentUser ? (
          <motion.div
            key={currentUser._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <UserCard user={currentUser} />
            <div className="flex gap-4 mt-4 justify-center">
              <button
                onClick={() => handleAction("ignore", currentUser)}
                className="btn w-32 btn-error"
              >
                Ignore
              </button>
              <button
                onClick={() => handleAction("like", currentUser)}
                className="btn w-32 btn-success"
              >
                Like
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500"
          >
            No more users in the feed.
          </motion.p>
        )}
      </AnimatePresence>

      <MatchModal
        visible={matchModalVisible}
        matchedUser={matchedUser}
        onClose={() => setMatchModalVisible(false)}
      />
    </div>
  );
};

export default Home;
