import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { clearUser } from "../features/user/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleTitleClick = () => {
    navigate(isLoggedIn ? "/home" : "/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <button onClick={handleTitleClick} className="btn btn-ghost text-xl normal-case">
          DevTinder
        </button>
      </div>

      {isLoggedIn && (
        <div className="flex-none flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:block">
            {user?.username || "User"}
          </span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44"
            >
              <li>
                <button onClick={() => navigate("/matches")}>Connections</button>
              </li>
              <li>
                <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
