import { useState } from 'react'
import { nanoid } from 'nanoid'

import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

// each filter should have a unique name and behavior
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

// returns an array of the keys from FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP)

const App = ({tasks}) => {
  const [allTasks, setAllTasks] = useState(tasks)
  const [filter, setFilter] = useState('All')

  const addTask = (name) => {
    // using nanaoid to generate unique IDs for each new task
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false }
    // use spread operator to grab all tasks and append the new task to the array
    setAllTasks([...tasks, newTask])
  }
  
  const deleteTask = (id) => {
    // use filter to go through the array to look for tasks that do not have the passed id
    const remainingTasks = tasks.filter(task => task.id !== id)
    setAllTasks(remainingTasks)
  }

  const editTask = (id, newName) => {
    // use map to look for task with same id and update the name of task
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    setAllTasks(editedTaskList)
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      // check to see if the task (from tasks) has the same id as the edited task
      if (id === task.id) {
        // make a new object that reverses the completed prop
        return {...task, completed: !task.completed}
      }
      return task
    })
    setAllTasks(updatedTasks)
  }

  // want to filter over tasks that match the FILTER_MAP key
  const taskList = allTasks
    .filter(FILTER_MAP[filter])
    .map(task => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  })

  const filterList = FILTER_NAMES.map(name => {
    return(
      <FilterButton 
        key={name}
        name={name} 
        isPressed={name === filter}
        setFilter={setFilter}
      />
    )
  })
  
  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText =  `${taskList.length} ${taskNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
        <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App