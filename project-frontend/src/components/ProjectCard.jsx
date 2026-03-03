import React from "react";
import Card from "@/components/ui/Card";

export default function ProjectCard({ project }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm text-slate-600">{project.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-500">{project.startDate} — {project.endDate}</div>
        <a href={`/projects/${project.id}`} className="text-blue-600">Open</a>
      </div>
    </Card>
  );
}