import { useState } from 'react'
import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

const App = ({tasks}) => {
  const [allTasks, setAllTasks] = useState(tasks)

  const addTask = (name) => {
    const newTask = { id: "id", name: name, completed: false }
    setAllTasks([...tasks, newTask])
  }

  const taskList = allTasks.map(task => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  })

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
        3 tasks remaining
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