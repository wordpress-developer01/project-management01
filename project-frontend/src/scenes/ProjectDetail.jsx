import React, { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import ModalNewTask from "../components/ModalNewTask";

const ProjectDetail = ({ project }) => {
  const initialTasks = useMemo(() => project?.tasks || [], [project]);
  const [tasks, setTasks] = useState(initialTasks);
  const [openNewTask, setOpenNewTask] = useState(false);

  function handleCreateTask(task) {
    setTasks((prev) => [...prev, task])
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>{project.status}</p>
      <p>{project.priority}</p>
      <p>{project.startDate} — {project.endDate}</p>

      <button onClick={() => setOpenNewTask(true)}>New Task</button>

      {openNewTask && (
        <ModalNewTask
          isOpen={openNewTask}
          onClose={() => setOpenNewTask(false)}
          onCreate={handleCreateTask}
          projectId={project.id}
        />
      )}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default ProjectDetail