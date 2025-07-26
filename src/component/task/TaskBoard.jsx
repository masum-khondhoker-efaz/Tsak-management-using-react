import { useState } from "react";
import AddTaskModel from "./AddTaskModel";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "This is the first task",
    tags: ["Tag1", "Tag2"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleAddEditTask = (newTask, isEditMode) => {
    if (isEditMode) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };
  const handleCloseClick = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };
  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };
  const handleSearchTerm = (searchTerm) => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filteredTasks]);
  };
  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModel
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToEdit={taskToEdit}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearchTerm} />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClickTask={() => setShowModal(true)}
            onDeleteAllTask={handleDeleteAllTask}
          />
          {tasks.length > 0 ? (<TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFavorite={handleFavorite}
          />): (<NoTaskFound />)}
        </div>
      </div>
    </section>
  );
}
