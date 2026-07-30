import { Button } from "react-bootstrap";
import { useState } from "react";

interface UploadFileProps {
  onUrlSelect: (url: string) => void;
  preview?: string;
}

const UploadFile = ({ onUrlSelect, preview }: UploadFileProps) => {
  const [loading, setLoading] = useState(false);

  const handleUploadClick = () => {
    const cloudinary = (window as any).cloudinary;

    if (!cloudinary) {
      alert("Cloudinary widget non caricato. Ricarica la pagina.");
      return;
    }

    setLoading(true);

    cloudinary.openUploadWidget(
      {
        cloudName: "csamygr3", // 👈 SOSTITUISCI
        uploadPreset: "gargano_explorer", // 👈 SOSTITUISCI
        multiple: false,
        sources: ["local", "url", "camera"],
      },
      (error: any, result: any) => {
        setLoading(false);

        if (error) {
          console.error("Errore:", error);
          alert("Errore nel caricamento");
          return;
        }

        if (result.event === "success") {
          const imageUrl = result.info.secure_url;
          console.log("URL:", imageUrl);
          onUrlSelect(imageUrl);
        }
      },
    );
  };

  return (
    <div className="mb-3 w-50 m-auto mt-2">
      <Button
        variant="info"
        onClick={handleUploadClick}
        disabled={loading}
        className="w-100"
      >
        {loading ? "Caricamento..." : "📤 Carica Immagine"}
      </Button>

      {preview && (
        <div className="mt-3 text-center">
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ccc",
            }}
          />
          <p className="mt-2 text-success">✅ Immagine caricata</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
