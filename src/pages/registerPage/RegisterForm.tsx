import { Col, Container, Form, Row } from "react-bootstrap";
import type { visitor } from "../../interfaces/intefaces";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import UploadFile from "../../components/componentiGenerali/UploadFile";

const RegisterForm = function () {
  const { t } = useTranslation();
  const [dataNazionalita, setDataNazionalita] = useState({});
  const [loading, setLoading] = useState(true);

  interface visitor {
    name: string;
    surname: string;
    email: string;
    telephone: string;
    password: string;
    biografy: string;
    avatar: string;
    nazionalita: string;
  }
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfermata, setPasswordConfermata] = useState("");
  const [biografy, setBiografy] = useState("");
  //
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

  // ✅ Riceve l'URL da FileUpload
  const handleUrlSelect = (url: string) => {
    setAvatar(url);
    setPreview(url);
  };

  const handleSubmit = (e) => {
    e.prevendefault();
  };

  const [nazioalita, setNazionalita] = useState("");

  useEffect(() => {
    const fetchNazionalita = async () => {
      try {
        const response = await fetch("http://localhost:8080/enums/nazionalita");

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        console.log("nazionalita ricevute:", data);

        setDataNazionalita(data); // ✅ Aggiorna lo state
        setLoading(false);
      } catch (error) {
        console.error("Errore fetch:", error);
        setLoading(false);
      }
    };
    fetchNazionalita();
  }, []);
  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <h3 className="text-center">{t("Inserisci i tuoi dati")}</h3>
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t("Inserisci il tuo nome")}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t("Inserisci il tuo cognome")}
                required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder={t("Inserisci la tua email")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder={t("Inserisci una password")}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder={t("Ripeti password")}
                required
                value={passwordConfermata}
                onChange={(e) => setPasswordConfermata(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="tel"
                placeholder={t("Inserisci il numero di telefono")}
                pattern="[0-9\s\-\+\(\)]+"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder={t("Inserisci una tua breve biografia")}
                required
                value={biografy}
                onChange={(e) => setBiografy(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t("Carica la tua foto di profilo")}
                value={avatar}
                readOnly
              />
              <UploadFile onUrlSelect={handleUrlSelect} preview={preview} />
            </Form.Group>
            <Form.Group>
              <Form.Select>
                <option value="" disabled selected>
                  Seleziona una nazionalità
                </option>
                {dataNazionalita.map((n) => {
                  return <option value={n.value}>{n.bandiera} {n.label}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
