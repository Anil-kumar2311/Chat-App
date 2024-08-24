import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async({ fullName, password, confirmPassword, profilePic }) => {
  
    // const success = handleInputErrors({ password, confirmPassword });
    // if (!success) return;
    

    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, password, profilePic })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Assuming the updated user data is returned in `data`
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile

function handleInputErrors({ password, confirmPassword }) {

  // If both fields are empty, return true without showing any error messages
  if (password === '' && confirmPassword === '') {
    return true;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  // Check if password meets minimum length requirement
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
