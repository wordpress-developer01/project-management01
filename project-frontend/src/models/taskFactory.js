// Небольшая фабрика для создания новой задачи (удобно при создании из модалки)
export function createTask({ title, description = "", status = "To Do", priority = "Medium", tags = "", startDate = "", dueDate = "", points = 0, projectId = null, assignee = null }) {
  return {
    id: Date.now(), // простая генерация id в frontend-first режиме
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    assignee,
    comments: [],
    attachments: [],
  };
}