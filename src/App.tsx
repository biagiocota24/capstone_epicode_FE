import "bootstrap/dist/css/bootstrap.min.css";
import AppContent from "./AppContent";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
