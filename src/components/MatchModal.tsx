import React from "react";

interface MatchModalProps {
  visible: boolean;
  matchedUser: string;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ visible, matchedUser, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 bg-opacity-70 z-50">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-[90%] max-w-sm text-center border border-base-300">
        <div className="text-3xl mb-3">🎉</div>
        <h2 className="text-xl font-semibold mb-2">It's a Match!</h2>
        <p className="text-sm text-gray-600">
          You and <span className="font-semibold">{matchedUser}</span> have liked each other.
        </p>
        <button className="btn btn-primary mt-6 w-full" onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default MatchModal;
