import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useUpdateProfile from "../../hooks/useUpdateProfile.js"; // Ensure the path is correct

const EditProfileModal = ({ isOpen, onClose }) => {
  const { authUser } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { loading, updateProfile } = useUpdateProfile();

  // Populate form fields with existing user data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName(authUser.fullName || "");
      setProfilePic(authUser.profilePic || "");
    }
  }, [isOpen, authUser]);

  const handleSave = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      console.log("Saving with data:", { fullName, password, profilePic });
      return;
    }

    try {
      // Send updated data to server
      await updateProfile({ fullName, password, profilePic });
      console.log("Saved:", { fullName, password, profilePic });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Profile Picture URL</label>
            <input
              type="text"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-400 text-white px-4 py-2 rounded-md mr-2"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
