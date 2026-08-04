import { Form } from "react-bootstrap";
import React from "react";

interface FormInputProps {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  as?: "textarea" | "input";
  rows?: number;
  pattern?: string;
  required?: boolean;
}

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  as = "input",
  rows = 3,
  pattern,
  required,
}: FormInputProps) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        as={as === "textarea" ? "textarea" : "input"}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        pattern={pattern}
        required={required}
        isInvalid={!!error}
      />

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
