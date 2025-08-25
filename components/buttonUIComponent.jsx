// components/PrimaryButton.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                  hover:scale-105 hover:font-semibold transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed  text-lg px-6 py-2 rounded-full font-bold hover:shadow-2xl ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
