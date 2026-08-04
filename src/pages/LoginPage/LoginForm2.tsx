import { Col, Container, Row } from "react-bootstrap";
import backGroundImage from "../../assets/sfondo.jpg";

const LoginForm2 = function () {
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Overlay schiarente */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          zIndex: 0,
        }}
      />

      {/* Form sopra l'overlay */}
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col lg={6}>
            <h3>{/* Form qui */}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm2;
