// src/components/TaskCard.jsx
import React from "react";

const PRIORITY_STYLES = {
  Urgent: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
  High: { bg: "#FFEDD5", text: "#9A3412", border: "#FDBA74" },
  Medium: { bg: "#FEF9C3", text: "#854D0E", border: "#FDE047" },
  Low: { bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
  Backlog: { bg: "#E5E7EB", text: "#374151", border: "#D1D5DB" },
};

const STATUS_STYLES = {
  "To Do": { bg: "#E5E7EB", text: "#374151" },
  "Work In Progress": { bg: "#DBEAFE", text: "#1D4ED8" },
  "Under Review": { bg: "#F3E8FF", text: "#6B21A8" },
  Completed: { bg: "#DCFCE7", text: "#166534" },
};

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function Avatar({ assignee }) {
  if (!assignee) return null;

  const size = 28;
  const style = {
    width: size,
    height: size,
    borderRadius: 9999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    border: "1px solid #E5E7EB",
    background: "#F3F4F6",
    color: "#111827",
    overflow: "hidden",
    flex: "0 0 auto",
  };

  if (assignee.avatarUrl) {
    return (
      <img
        src={assignee.avatarUrl}
        alt={assignee.name || "Assignee"}
        style={style}
      />
    );
  }

  return <div style={style} title={assignee.name}>{getInitials(assignee.name)}</div>;
}

function Pill({ children, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 8px",
        borderRadius: 9999,
        border: "1px solid transparent",
        fontSize: 12,
        lineHeight: "18px",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default function TaskCard({ task, onClick }) {
  const {
    title,
    priority = "Backlog",
    status = "To Do",
    assignee,
    tags = [],
  } = task || {};

  const p = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Backlog;
  const s = STATUS_STYLES[status] || STATUS_STYLES["To Do"];

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: 12,
        background: "white",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              color: "#111827",
              marginBottom: 6,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={title}
          >
            {title || "Untitled task"}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Pill style={{ background: p.bg, color: p.text, borderColor: p.border, border: `1px solid ${p.border}` }}>
              {priority}
            </Pill>

            <Pill style={{ background: s.bg, color: s.text }}>
              {status}
            </Pill>

            {Array.isArray(tags) &&
              tags.slice(0, 4).map((t) => (
                <Pill key={t} style={{ background: "#F9FAFB", color: "#374151", border: "1px solid #E5E7EB" }}>
                  #{t}
                </Pill>
              ))}

            {Array.isArray(tags) && tags.length > 4 && (
              <Pill style={{ background: "#F9FAFB", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                +{tags.length - 4}
              </Pill>
            )}
          </div>
        </div>

        <Avatar assignee={assignee} />
      </div>
    </div>
  );
}