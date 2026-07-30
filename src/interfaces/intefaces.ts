export interface visitor {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  biografy: string;
  avatar: string;
  nazionalita: string;
}

export interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  preview?: string;
}
