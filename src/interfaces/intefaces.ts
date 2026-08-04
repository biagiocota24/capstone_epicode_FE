// USERS & REGISTER & LOGIN
export interface Visitor {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  biografy: string;
  avatar: string;
  nazionalita: string;
}

export interface BusinessOwner {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  biografy: string;
  avatar: string;
}

export interface Admin {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  password: string;
  biografy: string;
  avatar: string;
  dataAssunzione: Date;
}

export interface CredenzialiLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  role: string;
  currentUser: Admin | BusinessOwner | Visitor;
}

export interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  preview?: string;
}
