import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";



const App = () => {
  const [showAddTask, setShowAddTask] =useState(false)
  const [tasks, setTasks] =useState([ ])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskFromServer = await fetchTasks();
        setTasks(taskFromServer);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    getTasks();
  }, []);
  
// Fetch Tasks
const fetchTasks = async () => {
  try {
    const res = await fetch('http://localhost:5000/tasks');

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};


    // Add Task
    const addTask =async (task) => {
      try {
        console.log('Adding a new task:', task);
    
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to add task: ${response.statusText}`);
        }
    
        // The new task should be in the response data
        const newTask = await response.json();
    
        console.log('New task added:', newTask);
        // Handle the new task as needed (e.g., update state)
      } catch (error) {
        console.error('Error adding task:', error);
      }
      const newId = tasks.length+1; // Get the current length of tasks as the new ID
      const newTask = { id: newId, ...task };
      setTasks([...tasks, newTask]);
    };

    const addTasks = (newTasks) => {
      for (let i = 1; i < newTasks.length; i++) {
        const newTask = { id: tasks.length + i, ...newTasks[i] };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    };

    

    // Delete Task

    const deleteTask = async (id) => {
      console.log('Deleting task with id:', id);

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });

     setTasks (tasks.filter((task) => task.id 
     !== id ))
       }

    // Toggle Reminder
    const toggleReminder = (id) => {
      setTasks(
        tasks.map((task) => 
        task.id ===id ?{...task, reminder: !task.reminder} :task
        )
        )
    }

return (
    <div className="container">

      <Header onAdd={() => setShowAddTask
      (!showAddTask)}
      showAdd={setShowAddTask && showAddTask} 
       />
      {showAddTask &&<AddTask onAdd={addTask}/>}
      {
        tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete= {deleteTask} 
          onToggle={toggleReminder}
        />
        : 'No Task To Show'
        }
   
    </div>
  );
}

export default App;
