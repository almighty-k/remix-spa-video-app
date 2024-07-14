import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-7000"
      >
        {label}
      </label>
      <input
        {...props}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 "
      />
    </div>
  );
};
