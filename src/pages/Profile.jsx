import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await API.post("/users/profile/update", form);
      setUser(res.data.user);
      setEditing(false);
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      fullname: user?.fullname || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
    });
    setEditing(false);
  };

  const skills = user?.profile?.skills || [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border transition-all ${
            toast.type === "error"
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your personal information</p>
        </div>

        {/* Avatar + name card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 shrink-0">
            {user?.fullname?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.fullname}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <span className="mt-1 inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full capitalize">
              {user?.role}
            </span>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="ml-auto text-sm font-semibold text-blue-600 border border-blue-200 hover:border-blue-400 px-4 py-2 rounded-xl transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Info card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
            Personal Information
          </h2>

          <div className="flex flex-col gap-4">
            <Field
              label="Full Name"
              name="fullname"
              value={form.fullname}
              editing={editing}
              onChange={handleChange}
            />
            <Field
              label="Email"
              name="email"
              value={form.email}
              editing={editing}
              onChange={handleChange}
              type="email"
            />
            <Field
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              editing={editing}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio + Skills */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
            Professional Info
          </h2>

          <div className="flex flex-col gap-4">
            {/* Bio */}
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">
                Bio
              </label>
              {editing ? (
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell recruiters about yourself..."
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none"
                />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {user?.profile?.bio || (
                    <span className="text-gray-300 italic">No bio added yet</span>
                  )}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">
                Skills
              </label>
              {editing ? (
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                />
              ) : skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic">No skills added yet</p>
              )}
              {editing && (
                <p className="text-xs text-gray-400 mt-1.5">Separate skills with commas</p>
              )}
            </div>
          </div>
        </div>

        {/* Save / Cancel buttons */}
        {editing && (
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 px-5 py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, name, value, editing, onChange, type = "text" }) => (
  <div>
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">
      {label}
    </label>
    {editing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
      />
    ) : (
      <p className="text-sm text-gray-700">{value || <span className="text-gray-300 italic">Not set</span>}</p>
    )}
  </div>
);

export default Profile;
