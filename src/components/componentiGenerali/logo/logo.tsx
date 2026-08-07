import { FaCompass } from "react-icons/fa";
import "./logo.css";
interface LogoProps {
  tema: "dark" | "light";
}

const Logo = function ({ tema }: LogoProps) {
  return (
    <div className="d-flex align-items-center">
      <div
        className={
          tema === "dark" ? "compass-icon-scura" : "compass-icon-chiara"
        }
      >
        <FaCompass />
      </div>
      <div
        className={
          tema === "dark" ? "scritta-logo-scura" : "scritta-logo-chiara"
        }
      >
        Gargano Explorer
      </div>
    </div>
  );
};

export default Logo;
