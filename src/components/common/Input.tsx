import React, { FC } from "react";
import classNames from "classnames";

// Define the types for the props
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  [key: string]: any; // To allow additional props
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  size = "md",
  ...rest
}) => {
  const inputStyles = classNames(
    "w-full rounded border focus:outline-none transition duration-200",
    {
      "p-1 text-sm": size === "sm",
      "p-2 text-base": size === "md",
      "p-3 text-lg": size === "lg",
      "border-gray-300 bg-white text-gray-800 focus:border-blue-400 focus:ring focus:ring-blue-100": !error && !disabled,
      "border-red-400 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200":
        error,
      "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400": disabled,
    }
  );

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={inputStyles}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;
