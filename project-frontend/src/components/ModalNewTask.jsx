// src/components/ModalNewTask.jsx
import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_STATUSES = ["To Do", "Work In Progress", "Under Review", "Completed"];
const DEFAULT_PRIORITIES = ["Urgent", "High", "Medium", "Low", "Backlog"];

export default function ModalNewTask({
  open,
  onClose,
  onCreate,
  statuses = DEFAULT_STATUSES,
  priorities = DEFAULT_PRIORITIES,
  initialValues,
}) {
  const initial = useMemo(
    () => ({
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      ...(initialValues || {}),
    }),
    [initialValues]
  );

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setValues(initial);
      setErrors({});
    }
  }, [open, initial]);

  if (!open) return null;

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.title || !values.title.trim()) next.title = "Title is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const task = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: values.title.trim(),
      description: values.description?.trim() || "",
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate || null,
      tags: [],
      assignee: null,
      createdAt: new Date().toISOString(),
    };

    if (typeof onCreate === "function") onCreate(task);
    if (typeof onClose === "function") onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(17,24,39,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 50,
      }}
      onMouseDown={(e) => {
        // закрыть по клику на оверлей
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "min(560px, 100%)",
          background: "white",
          borderRadius: 14,
          border: "1px solid #E5E7EB",
          padding: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>New Task</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #E5E7EB",
              background: "#F9FAFB",
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#374151", marginBottom: 6 }}>
              Title <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Implement auth screen"
              style={{
                width: "100%",
                borderRadius: 10,
                border: `1px solid ${errors.title ? "#FCA5A5" : "#E5E7EB"}`,
                padding: "10px 12px",
                outline: "none",
              }}
            />
            {errors.title && (
              <div style={{ marginTop: 6, fontSize: 12, color: "#DC2626" }}>{errors.title}</div>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "#374151", marginBottom: 6 }}>
              Description
            </label>
            <textarea
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={4}
              placeholder="Optional details…"
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid #E5E7EB",
                padding: "10px 12px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "#374151", marginBottom: 6 }}>
                Status
              </label>
              <select
                value={values.status}
                onChange={(e) => setField("status", e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid #E5E7EB",
                  padding: "10px 12px",
                  outline: "none",
                  background: "white",
                }}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, color: "#374151", marginBottom: 6 }}>
                Priority
              </label>
              <select
                value={values.priority}
                onChange={(e) => setField("priority", e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: "1px solid #E5E7EB",
                  padding: "10px 12px",
                  outline: "none",
                  background: "white",
                }}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "#374151", marginBottom: 6 }}>
              Due date
            </label>
            <input
              type="date"
              value={values.dueDate || ""}
              onChange={(e) => setField("dueDate", e.target.value)}
              style={{
                width: "100%",
                borderRadius: 10,
                border: "1px solid #E5E7EB",
                padding: "10px 12px",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #E5E7EB",
              background: "white",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              border: "1px solid #111827",
              background: "#111827",
              color: "white",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}