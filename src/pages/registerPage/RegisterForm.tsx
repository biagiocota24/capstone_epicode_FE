<<<<<<< HEAD
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
=======
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import UploadFile from "../../components/componentiGenerali/UploadFile";
import FormInput from "../../components/componentiGenerali/FormInput";
import ToastNotification from "../../components/componentiGenerali/ToastNotification";
import { useEnumsStore } from "../../zustand/enumsStore";
import type { Visitor } from "../../interfaces/intefaces";

const RegisterForm = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { fetchAllEnums, NazionalitaEnums } = useEnumsStore();

  // CAMPI COMUNI
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfermata, setPasswordConfermata] = useState("");
  const [biografy, setBiografy] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");
  // CAMPO SOLO VISITOR
  const [nazionalita, setNazionalita] = useState("");
  // CAMPO SOLO BUSINESS OWNER

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
  }>({ show: false, type: "info", title: "", message: "" });

  const showToast = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => {
    setToast({ show: true, type, title, message });
  };

  const resetForm = () => {
    setName("");
    setSurname("");
    setEmail("");
    setTelephone("");
    setPassword("");
    setPasswordConfermata("");
    setBiografy("");
    setAvatar("");
    setNazionalita("");
    setPreview("");
    setErrors({});
  };

  const handleUrlSelect = (url: string) => {
    setAvatar(url);
    setPreview(url);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.avatar;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (password !== passwordConfermata) {
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        passwordConfermata: t("Le password non corrispondono"),
      }));
      showToast("error", t("Errore"), t("Le password non corrispondono"));
      return;
    }

    if (!avatar) {
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        avatar: t("Carica una foto di profilo"),
      }));
      showToast("info", t("Info"), t("Carica una foto di profilo"));
      return; //
    }

    const daRegistrare: Visitor = {
      name,
      surname,
      email,
      telephone,
      password,
      biografy,
      avatar,
      nazionalita,
    };

    try {
      const api_url = import.meta.env.VITE_API_URL;

      const response = await fetch(`${api_url}/auth/register/visitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daRegistrare),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Object.keys(data.errors).length > 0) {
          setErrors(data.errors);
          showToast("error", t("Errore"), t("Correggi gli errori nel modulo"));
        } else {
          showToast(
            "error",
            t("Errore"),
            data.message || t("Oops! Qualcosa è andato storto"),
          );
        }

        setIsLoading(false);
      } else {
        resetForm();
        setIsLoading(false);
        setShowSuccessModal(true);
      }
    } catch (errore) {
      showToast("error", t("Errore"), t("Oops! Qualcosa è andato storto"));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEnums();
  }, []);

  return (
    <>
      <ToastNotification
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <Modal show={showSuccessModal} centered>
        <Modal.Header
          style={{ backgroundColor: "var(--blu-mare)", color: "white" }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <FiCheckCircle size={22} />
            {t("Registrazione Completata!")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div style={{ fontSize: "3.5rem" }}>✅</div>
          <p className="mt-3 fs-5">
            {t("Benvenuto! Verrai reindirizzato al login...")}
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/login");
            }}
            style={{
              backgroundColor: "var(--blu-mare)",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 2rem",
            }}
          >
            {t("Continua")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <h3 className="text-center mb-4">{t("Inserisci i tuoi dati")}</h3>
            <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <FormInput
                type="text"
                placeholder={t("Inserisci il tuo nome")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />

              <FormInput
                type="text"
                placeholder={t("Inserisci il tuo cognome")}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                error={errors.surname}
                required
              />

              <FormInput
                type="email"
                placeholder={t("Inserisci la tua email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
              />

              <FormInput
                type="password"
                placeholder={t("Inserisci una password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />

              <FormInput
                type="password"
                placeholder={t("Ripeti password")}
                value={passwordConfermata}
                onChange={(e) => setPasswordConfermata(e.target.value)}
                error={errors.passwordConfermata}
                required
              />

              <FormInput
                type="tel"
                placeholder={t("Inserisci il numero di telefono")}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                error={errors.telephone}
                pattern="[0-9\s\-\+\(\)]+"
                required
              />

              <FormInput
                type="text"
                as="textarea"
                placeholder={t("Inserisci una tua breve biografia")}
                value={biografy}
                onChange={(e) => setBiografy(e.target.value)}
                error={errors.biografy}
                rows={3}
                required
              />

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder={t("Carica la tua foto di profilo")}
                  value={avatar}
                  readOnly
                />
                <UploadFile onUrlSelect={handleUrlSelect} preview={preview} />
                {errors.avatar && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {errors.avatar}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Select
                  value={nazionalita}
                  onChange={(e) => setNazionalita(e.target.value)}
                  isInvalid={!!errors.nazionalita}
                >
                  <option value="" disabled>
                    Seleziona una nazionalità
                  </option>
                  {NazionalitaEnums.map((n) => (
                    <option value={n.value} key={n.label}>
                      {n.bandiera} {n.label}
                    </option>
                  ))}
                </Form.Select>
                {errors.nazionalita && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {errors.nazionalita}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-3"
                style={{
                  backgroundColor: "var(--blu-mare)",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      size="sm"
                      animation="border"
                      className="me-2"
                      role="status"
                    />
                    {t("Registrazione in corso...")}
                  </>
                ) : (
                  t("Registrati")
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
>>>>>>> main
  );
};

export default RegisterForm;
