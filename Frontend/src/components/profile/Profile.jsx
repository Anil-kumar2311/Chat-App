import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";
import { FaUserEdit, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import EditProfileModal from "./EditProfileModal";
import SettingsModal from "./SettingsModal";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !isEditModalOpen &&
        !isSettingsModalOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, isEditModalOpen, isSettingsModalOpen]);

  return (
    <div className="relative">
      <div
        className="w-12 rounded-full cursor-pointer"
        onClick={togglePopup}
      >
        <img
          src={authUser.profilePic}
          alt="user avatar"
          className="rounded-full"
        />
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
        >
          <div className="flex items-center px-4 py-2 text-gray-500">
            <FaUser className="mr-1" />
            <span className="font-semibold">{authUser.username}</span>
            <div className="flex items-center ml-2 border-l border-gray-500 h-4"></div> {/* Separator */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <FaUserEdit
                className="ml-2 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-300"
                onClick={openEditModal}
              />
              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
                  Edit
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <div
            className="flex items-center px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-black"
            onClick={openSettingsModal}
          >
            <IoMdSettings className="mr-1"/>
            <span className="mr-2">Settings</span>
          </div>
          <LogoutButton />
        </div>
      )}
      <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </div>
  );
};

export default Profile;
