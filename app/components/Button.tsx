import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded px-4 py-2 font-bold text-white focus:outline-none focus:ring focus:ring-indigo-200 ${
        props.disabled
          ? "bg-gray-400 hover:bg-gray-400"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {children}
    </button>
  );
};
