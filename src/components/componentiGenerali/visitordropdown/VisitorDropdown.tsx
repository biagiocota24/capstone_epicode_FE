import { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../zustand/authStore";
import "./visitorDropdown.css";

interface DropdownProps {
  userName: string;
}

const UserDropdown = ({ userName }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  // Chiudi il dropdown quando clicchi fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Estrai le iniziali dal nome
  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      {/* Avatar Bottone */}
      <button
        className="avatar-button"
        onClick={() => setIsOpen(!isOpen)}
        title={userName}
      >
        <span className="avatar-initials">{initials}</span>
        <span className="avatar-name">{userName}</span>
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="dropdown-menu-custom">
          <div className="dropdown-item-section">
            <button
              className={
                location.pathname === "/visitor/profile"
                  ? "dropdown-item dropdown-item-active"
                  : "dropdown-item"
              }
              onClick={() => navigate("/visitor/profile")}
            >
              <FiUser size={18} />
              <span>Profilo</span>
            </button>

            <button className="dropdown-item">
              <FiSettings size={18} />
              <span>Impostazioni</span>
            </button>
          </div>

          <div className="dropdown-divider"></div>

          <button className="dropdown-item logout-item" onClick={handleLogout}>
            <FiLogOut size={18} />
            <span>Esci</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
