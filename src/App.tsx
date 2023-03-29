import React, { useEffect, useState } from 'react';
import Home from './pages/Home';

const LOCAL_STORAGE_KEY = "todo:savedTask"

export interface ITask {
  title: string,
  id: number,
  isCompleted: boolean,
}

export function App() {

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  },
    [])

  function saveTasks(newTask: ITask[]) {
    setTasks(newTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTask));
  }

  function createTask(title: string) {
    if (!title) return;
    const newTask = {
      title: title,
      id: tasks.length + 1,
      isCompleted: false,
    }
    saveTasks([...tasks, newTask])
  }

  function removeTask(id: number) {
    const newTask = tasks.filter(task => task.id !== id)
    saveTasks(newTask)
  }

  function toggleTask(id: number) {

    const newTask = tasks.map((task) => {
      if (task.id === id)
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      return task;
    }
    )
    saveTasks(newTask)
  }

  return (
    <Home tasks={tasks} createTask={createTask} removeTask={removeTask} toggleTask={toggleTask} />
  )
}

export default App;
