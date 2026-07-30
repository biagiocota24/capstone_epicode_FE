import { Navbar, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import SelettoreLingua from "../selettore-lingua/SelettoreLingua";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const navbarColor = "#0a6e8c";

const menuStyle: React.CSSProperties = {
  backgroundColor: navbarColor,
  border: "none",
  borderRadius: "0 0 8px 8px",
  marginTop: 0,
  right: 0,
  left: "auto",
  animation: "dropdownFade 0.2s ease-out",
};

const itemStyle: React.CSSProperties = {
  color: "#ffffff",
  transition: "background-color 0.2s ease, padding-left 0.2s ease",
};

const MyNavbar = function () {
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`,
      );
    }
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <style>{`
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .navbar-dropdown-item:hover {
          background-color: rgba(255,255,255,0.15) !important;
          color: #ffffff !important;
          padding-left: 1.5rem !important;
        }
      `}</style>
      <Navbar className="blu-mare p-3" ref={navRef}>
        <div>
          <h2 className="text-white">Gargano explorer</h2>
        </div>
        <div className="ms-auto d-flex align-items-center gap-3">
          <SelettoreLingua />
          <Dropdown align="end">
            <Dropdown.Toggle as="span" style={{ cursor: "pointer" }}>
              <FaUserCircle className="text-white fs-1" />
            </Dropdown.Toggle>
            <Dropdown.Menu style={menuStyle}>
              <Dropdown.Item
                href="#"
                style={itemStyle}
                className="navbar-dropdown-item"
              >
                {t("navbar.accedi")}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                style={itemStyle}
                className="navbar-dropdown-item"
              >
                {t("navbar.registrati")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
};

export default MyNavbar;
