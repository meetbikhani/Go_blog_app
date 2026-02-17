import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, FileText } from "lucide-react";

const AvatarDropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors"
      >
        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-gray-800 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 border-b border-gray-800">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          <Link
            to="/my-blogs"
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FileText className="w-4 h-4 mr-2" />
            My Blogs
          </Link>

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
