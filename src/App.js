import Header from "./components/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import {useEffect, useState} from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const server = 'http://localhost:5000'

  // Runs every time the screen renders
  useEffect(() => {

    fetchTasks()
    console.log('Tasks updated')

  }, [tasks.length])

  // Toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    await updateTask(updatedTask)
  }

  // fetchTasks
  const fetchTasks = async () => {
    const res = await fetch(`${server}/tasks`)
    setTasks(await res.json())
  }

  // fetchTask
  const fetchTask = async (id) => {
    const res = await fetch(`${server}/tasks/${id}`)
    return await res.json()
  }

  // Add Task
  const addTask = async (newTask) => {
    const res = await fetch(`${server}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Update a Task
  const updateTask = async (updatedTask) => {
    const res = await (await fetch(`${server}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    }))

    const updatedServerTask = await res.json()

    setTasks(tasks.map(task => task.id === updatedServerTask.id ? updatedServerTask : task))
  }
  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${server}/tasks/${id}`, {
      method: 'DELETE'
    })
    // Filter out the deleted task
    setTasks(tasks.filter((task) =>
      task.id !== id
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length ? (<Tasks
              tasks={tasks}
              onDelete={deleteTask}
              toggleTask={toggleReminder}
            />) : (<h2>No tasks to show.</h2>)}
          </>
        )}
        />

        <Route path='/about' component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
