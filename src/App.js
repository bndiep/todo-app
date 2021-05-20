import { useState } from 'react'
import { nanoid } from 'nanoid'

import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

const App = ({tasks}) => {
  const [allTasks, setAllTasks] = useState(tasks)

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

  const taskList = allTasks.map(task => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
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
        <FilterButton />
        <FilterButton />
        <FilterButton />
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