import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-base-100 text-center overflow-hidden">
      <h1 className="text-6xl font-bold mb-4 tracking-tight">DevTinder</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Find your perfect coding match — connect, collaborate, and create.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Landing;
