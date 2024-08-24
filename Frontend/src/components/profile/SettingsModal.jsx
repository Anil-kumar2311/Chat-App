import { useState, useEffect } from "react";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import useSettingsSave from "../../hooks/useSettingsSave";

const SettingsModal = ({ isOpen, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [setting2, setSetting2] = useState("");
  const [setting3, setSetting3] = useState("");


  const { loading, SettingsSave } = useSettingsSave();

  // Retrieve the theme from localStorage when the component mounts
  useEffect(() => {
    const getThemeFromLocalStorage = () => {
      const storedData = localStorage.getItem("chat-setting");
      const parsedData = storedData ? JSON.parse(storedData) : null;
      return parsedData?.theme || "light"; // Default to "light" if no theme is found
    };

    const theme = getThemeFromLocalStorage();
    setSelectedTheme(theme);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await SettingsSave({ theme: selectedTheme }); // Save the selected theme
    onClose();
  };

  const toggleTheme = () => {
    setSelectedTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Theme</label>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-300 mr-2">Light</span>
                <CiDark className="text-xl text-gray-300" />
              </div>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  id="toggle"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                  checked={selectedTheme === "dark"}
                  onChange={toggleTheme}
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"
                  style={{
                    backgroundColor: selectedTheme === "dark" ? "#374151" : "#d1d5db",
                  }}
                ></label>
                <style jsx>{`
                  .toggle-checkbox:checked {
                    transform: translateX(100%);
                  }
                  .toggle-checkbox {
                    left: 0;
                    top: 0;
                    transition: transform 0.2s ease-in-out;
                  }
                  .toggle-label {
                    width: 100%;
                    position: relative;
                  }
                `}</style>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 mr-2">Dark</span>
                <MdDarkMode className="text-xl text-gray-300" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Settings2</label>
            <input
              type="text"
              value={setting2}
              onChange={(e) => setSetting2(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Settings3</label>
            <input
              type="text"
              value={setting3}
              onChange={(e) => setSetting3(e.target.value)}
              className="border rounded-md w-full p-2 bg-gray-300 text-gray-900"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
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

export default SettingsModal;
