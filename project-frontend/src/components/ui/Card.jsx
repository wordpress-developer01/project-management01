import React from "react";

export default function Card({ children }) {
  return <div className="rounded border p-4 shadow-sm bg-white">{children}</div>;
}