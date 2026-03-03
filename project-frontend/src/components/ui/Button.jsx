import React from "react";

export default function Button({ children, onClick, variant = "primary" }) {
  const base = "px-3 py-1 rounded";
  const style =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-100 text-slate-800";
  return (
    <button className={`${base} ${style}`} onClick={onClick}>
      {children}
    </button>
  );
}