import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../types/user";
import { setUser } from "../features/user/userSlice";

const editableKeys: (keyof User)[] = [
  "username",
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "skills"
];

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [form, setForm] = useState<Partial<User>>({});
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (user && user.username) {
      const safeUser: Partial<User> = {
        username: user.username ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        age: user.age ?? 18,
        gender: user.gender ?? "male",
        about: user.about ?? "",
        skills: Array.isArray(user.skills) ? user.skills : [],
      };
      setForm(safeUser);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "age" ? Number(value) : value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const skillArray = value.split(",").map((s) => s.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, skills: skillArray }));
  };

  const handleSave = async () => {
    try {
      const updates: Partial<User> = {};

      editableKeys.forEach((key) => {
        const value = form[key];
        if (typeof value === "string" || typeof value === "number") {
          Object.assign(updates, { [key]: value });
        }
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          Object.assign(updates, { [key]: value });
        }
      });

      const res = await axios.post<{ message: string; user: User }>(
        "http://localhost:5000/api/profile/edit",
        updates,
        { withCredentials: true }
      );

      // ✅ update Redux store
      dispatch(setUser({ ...res.data.user }));

      setEditing(false);
      setConfirming(false);
      setToastMsg(res.data.message);
      setTimeout(() => setToastMsg(""), 3000);
    } catch (err) {
      console.error("Profile update failed", err);
      setToastMsg("Something went wrong.");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="space-y-4">
        {editableKeys.map((key) => {
          const value = form[key];

          return (
            <div key={key}>
              <label className="label text-sm font-medium capitalize">{key}</label>

              {!editing ? (
                <input
                  type="text"
                  value={Array.isArray(value) ? value.join(", ") : value ?? ""}
                  readOnly
                  disabled
                  className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                />
              ) : key === "about" ? (
                <textarea
                  name={key}
                  className="textarea textarea-bordered w-full"
                  value={value as string}
                  onChange={handleChange}
                />
              ) : key === "gender" ? (
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={value as string}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : key === "age" ? (
                <input
                  type="number"
                  name="age"
                  value={value as number}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min={18}
                />
              ) : key === "skills" ? (
                <input
                  type="text"
                  name="skills"
                  value={Array.isArray(value) ? value.join(", ") : ""}
                  onChange={handleSkillsChange}
                  className="input input-bordered w-full"
                  placeholder="Comma-separated (e.g. JavaScript, Python)"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={value as string}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {!editing ? (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={() => setConfirming(true)}>
              Save
            </button>
          </>
        )}
      </div>

      {confirming && (
        <div className="fixed inset-0 bg-base-100/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-2">Confirm Changes</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to save these profile changes?
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn btn-outline" onClick={() => setConfirming(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSave}>
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="bg-success text-white px-6 py-2 rounded-xl shadow-lg min-w-[300px] text-center text-sm">
            {toastMsg}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
