import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ToastNotification from "../../components/componentiGenerali/ToastNotification";
import { FiCheckCircle } from "react-icons/fi";
import FormInput from "../../components/componentiGenerali/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../zustand/authStore";

const LoginForm = function () {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginData = {
    email,
    password,
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const success = await login(loginData);

    if (success) {
      showToast("success", t("Successo"), t("Login avvenuto con successo"));
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setEmail("");
        setPassword("");
        navigate("/home");
      }, 1500);

      setIsLoading(false);
    } else {
      showToast("error", t("Errore"), t("Email o password non corretti"));
      setIsLoading(false);
    }
  };

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
            {t("Login avvenuto con successo")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div style={{ fontSize: "3.5rem" }}>✅</div>
        </Modal.Body>
      </Modal>

      <Container fluid className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <h3 className="text-center mb-4">{t("Inserisci i tuoi dati")}</h3>
            <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
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
                placeholder={t("Inserisci la password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />

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
                    {t("Accesso in corso...")}
                  </>
                ) : (
                  t("accedi")
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
