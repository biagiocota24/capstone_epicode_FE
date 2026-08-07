import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./AttrazionePage.css";
import { useAuthStore } from "../../../zustand/authStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStruttureStore } from "../../../zustand/struttureStore";
import CardStruttura from "../../../components/componentiGenerali/card-struttura/CardStruttura";

const AttrazioniPage = function () {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { strutture, getStrutture } = useStruttureStore();

  const [query, setQuery] = useState("");

  useEffect(() => {
    getStrutture();
  }, [getStrutture]);

  console.log(strutture);

  console.log(strutture[0]);

  return (
    <Container fluid>
      <div className="hero-section px-3">
        <span>Ciao , {user?.name || "Turista"}</span>
        <h1>Cosa vuoi esplorare oggi?</h1>
        <p>
          Spiagge , Borghi , sentieri ed esperienze locali , tutto in un unico
          posto
        </p>
        <Form className="form-wrapper">
          <input
            className="border-0 w-100 h-50"
            type="text"
            placeholder="Cerca spiagge , borghi, itinerari"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="role-button role-button-active mt-2 w-100 py-2 h-50"
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
              t("Cerca")
            )}
          </button>
        </Form>
      </div>
      <div className="risultati-ricerca">
        {!Array.isArray(strutture) || strutture.length === 0 ? (
          <div>Nessuna struttura trovata</div>
        ) : (
          <Row xs={1} md={3} lg={4}>
            {strutture.map((str) => (
              <Col key={str.id} className="g-3">
                <CardStruttura struttura={str} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      {/* <CardStruttura struttura={strutture[0]} /> */}
    </Container>
  );
};

export default AttrazioniPage;
