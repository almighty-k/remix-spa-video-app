import { type InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const FileInput = ({ ...props }: FileInputProps) => {
  return (
    <input
      className="file:mr-2 file:rounded file:border-0 file:bg-violet-100 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
      {...props}
      type="file"
    />
  );
};
