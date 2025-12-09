import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../app/store";
import { updateUserInfo } from "../../../../features/users/userslice";

const UserSection: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!user)
    return <p className="p-6 text-gray-700">Please log in to see your profile.</p>;

  const handleSave = () => {
    dispatch(updateUserInfo({ name, email, phone }));
    setEditOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-2xl">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-800">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
          {user.phone && <p className="text-gray-500">Phone: {user.phone}</p>}
          <p className="mt-2 text-sm">
            Role: <span className="capitalize font-medium">{user.role}</span>
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setEditOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setEditOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-pink-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSection;
