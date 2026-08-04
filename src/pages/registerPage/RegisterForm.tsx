import { Form } from "react-bootstrap";
import "./registerForm.css";
import { FaCompass, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMail } from "react-icons/fi";

const RegisterForm = function () {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("turista");

  const roles = [
    { id: "turista", label: "Turista", icon: "🧳" },
    { id: "Imprenditore", label: "Imprenditore", icon: "📍" },
  ];
  return (
    <div className="register-page d-flex row">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="hero p-5 col-5 d-none d-md-flex">
        <div className="d-flex align-items-center">
          <div className="compass-icon">
            <FaCompass />
          </div>
          <div className="text-white fw-bold fs-3">Gargano Explorer</div>
        </div>
        <div className="hero-header">
          <h1 className="fw-bold">Scopri il Gargano, un'onda alla volta.</h1>
          <p>
            Accedi per salvare i tuoi luoghi preferiti, pianificare itinerari e
            scoprire attrazioni curate da chi vive il territorio.
          </p>
        </div>
        <div className="d-flex gap-4">
          <span>
            <div className="fw-bold fs-4">180+</div>
            <div className="small">attrazioni</div>
          </span>
          <span>
            <div className="fw-bold fs-4">40</div>
            <div>comuni</div>
          </span>
          <span>
            <div className="fw-bold fs-4">4.0★</div>
            <div>recensioni utenti</div>
          </span>
        </div>
      </div>
      <div className="col-7 page-content">
        <div className="form-wrapper">
          <h2 className="fw-bold">Bentornato</h2>
          <p className="text-secondary small">Registrati alla piattaforma</p>
          <div className="role-wrapper">
            {roles.map((role) => {
              return (
                <button
                  onClick={() => {
                    setSelectedRole(role.id);
                  }}
                  className={
                    selectedRole === role.id
                      ? "role-button role-button-active"
                      : "role-button"
                  }
                >
                  {role.icon} {role.label}
                </button>
              );
            })}
          </div>
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">Email</Form.Label>
              <div style={{ position: "relative" }}>
                <FiMail
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1a7a96",
                    pointerEvents: "none",
                  }}
                />
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={t("login.emailPlaceholder")}
                  style={{ paddingLeft: "40px" }}
                />
                {/* {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )} */}
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
