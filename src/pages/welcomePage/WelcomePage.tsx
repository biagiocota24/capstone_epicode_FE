import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WelcomePage = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Container fluid>
      <h1 className="text-center mt-5">BENVENUTI</h1>
      <div className=" mt-5 d-flex justify-content-center gap-4">
        <Button onClick={() => navigate("/login")}>{t("navbar.accedi")}</Button>
        <Button onClick={() => navigate("/register")}>
          {t("navbar.registrati")}
        </Button>
      </div>
    </Container>
  );
};

export default WelcomePage;
