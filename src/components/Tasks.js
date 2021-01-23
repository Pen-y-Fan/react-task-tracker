import Task from "./Task";

const Tasks = ({tasks, onDelete, toggleTask}) => {

  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={toggleTask}
        />
      ))}
    </>
  );
};

export default Tasks;
