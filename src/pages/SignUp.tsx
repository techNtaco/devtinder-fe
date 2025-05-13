import { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { setUser } from "../features/user/userSlice";
import FormGroup from "../components/FormGroup";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { username, email, password, firstName, lastName, age, gender } = form;
  
    if (!username || !email || !password || !firstName || !lastName || !age || !gender) {
      setError("All fields are required.");
      return;
    }
  
    try {
      // Step 1: Signup
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
          firstName,
          lastName,
          age: Number(age),
          gender,
        },
        { withCredentials: true }
      );
  
      // Step 2: Fetch full profile
      const { data } = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
  
      dispatch(setUser(data));
  
      navigate("/home");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ error: string }>;
      setError(axiosErr.response?.data?.error || "Signup failed. Please try again.");
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Your DevTinder Account</h1>

      <div className="w-full max-w-md space-y-4">
        <FormGroup label="Username" required>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            value={form.username}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Email" required>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Password" required>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="First Name" required>
          <input
            type="text"
            name="firstName"
            className="input input-bordered w-full"
            value={form.firstName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Last Name" required>
          <input
            type="text"
            name="lastName"
            className="input input-bordered w-full"
            value={form.lastName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Age" required>
          <input
            type="number"
            name="age"
            className="input input-bordered w-full"
            value={form.age}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Gender" required>
          <select
            name="gender"
            className="select select-bordered w-full"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </FormGroup>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button className="btn btn-primary w-full mt-2" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
