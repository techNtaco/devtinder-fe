import React from "react";

interface FormGroupProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

export default FormGroup;
