import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-slate-50 p-4 border-r hidden md:block">
      <nav className="flex flex-col gap-2">
        <Link to="/" className="text-slate-700 hover:text-blue-600">Home</Link>
        <Link to="/projects" className="text-slate-700 hover:text-blue-600">Projects</Link>
      </nav>
    </aside>
  );
}

