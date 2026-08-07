import { useNavigate } from "react-router-dom";
import { FiMapPin, FiStar } from "react-icons/fi";
import "./cardStruttura.css";
import type { StrutturaResponse, StrutturaTipo } from "../../../interfaces/struttureInterfaces";

interface StruttureLCardProps {
  struttura: StrutturaResponse;
}

const CardStruttura = ({ struttura }: StruttureLCardProps) => {
  const navigate = useNavigate();

  const rating = 4.8;

  return (
    <div
      className="struttura-card"
      onClick={() => navigate(`/visitor/attrazioni/${struttura.id}`)}
    >
      {/* IMAGE CONTAINER */}
      <div className="struttura-card-image-container">
        {struttura.fotoUrls ? (
          <img
            src={struttura.fotoUrls[0]}
            alt={struttura.name}
            className="struttura-card-image"
          />
        ) : (
          <div className="struttura-card-image-placeholder">Nessuna foto</div>
        )}

        {/* RATING BADGE */}
        <div className="struttura-card-rating">
          <FiStar size={16} fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>

      {/* INFO CONTAINER */}
      <div className="struttura-card-info">
        <h3 className="struttura-card-name">{struttura.name}</h3>

        <div className="struttura-card-location">
          <FiMapPin size={14} />
          <span>{struttura.cittaNome || "Luogo non specificato"}</span>
        </div>
      </div>
    </div>
  );
};

export default CardStruttura;
