import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/user/userSlice";
import { AppDispatch } from "../app/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    setTouched({ email: true, password: true });
  
    if (!email || !password) return;
  
    try {
      // Step 1: Login
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
  
      // Step 2: Fetch full profile
      const { data } = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });

      dispatch(setUser(data.user));
  
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Invalid email or password.");
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <h1 className="text-2xl font-bold">Login to DevTinder</h1>

      <div className="w-full max-w-xs">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        />
        {touched.email && !email && (
          <p className="text-xs text-red-500 mt-1">Email is required</p>
        )}
      </div>

      <div className="w-full max-w-xs">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
        />
        {touched.password && !password && (
          <p className="text-xs text-red-500 mt-1">Password is required</p>
        )}
      </div>

      <button
        className="btn btn-primary w-full max-w-xs"
        onClick={handleLogin}
      >
        Login
      </button>

      {loginError && (
        <p className="text-sm text-red-500 mt-2">{loginError}</p>
      )}
    </div>
  );
};

export default Login;
