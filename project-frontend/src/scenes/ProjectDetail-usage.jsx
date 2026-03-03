import React, { useState } from "react";
import { tasks as mockTasks } from "@/mocks/tasks";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { createTask } from "@/models/taskFactory";

export default function ProjectDetail({ params }) {
  const projectId = Number(params?.id) || 45;
  const [tasks, setTasks] = useState(mockTasks.filter(t => t.projectId === projectId));
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (taskData) => {
    const newTask = createTask({ ...taskData, projectId });
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDelete = (taskId) => setTasks(prev => prev.filter(t => t.id !== taskId));

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="mb-4">Add Task</button>
      <ModalNewTask isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleCreate} projectId={projectId} />
      <div>
        {tasks.map(t => <TaskCard key={t.id} task={t} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}