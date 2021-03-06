import { useEffect, useRef, useState } from 'react'

const Todo = ({
  completed,
  deleteTask,
  editTask,
  id,
  name,
  toggleTaskCompleted,
  usePrevious,
}) => {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  // useRef is a hook that creates an object with a single property: current
  // can be used as a reference
  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)
  const wasEditing = usePrevious(isEditing)

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      return
    }
    editTask(id, newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={id}>
          New name for {name}
        </label>
        <input 
          id={id} 
          className='todo-text'
          type='text'
          value={newName || name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn todo-cancel'
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className='visually-hidden'>renaming {name}</span>
        </button>
        <button 
          type='submit'
          className='btn btn__primary todo-edit'
        >
          Save
          <span className='visually-hidden'>new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
          <input
            id={id}
            type='checkbox'
            defaultChecked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label className='todo-label' htmlFor={id}>
            {name}
          </label>
        </div>
        <div className='btn-group'>
          <button
            type='button'
            className='btn'
            onClick={() => setEditing(true)}
            ref={editButtonRef}
          >
            Edit <span className='visually-hidden'>{name}</span>
          </button>
          <button
            type='button'
            className='btn btn__danger'
            onClick={() => deleteTask(id)}
          >
            Delete <span className='visually-hidden'>{name}</span>
          </button>
        </div>
    </div>
  )
  
  // looks at the previous value of isEditing when it was changed
  useEffect(() => {
    if (!wasEditing && isEditing) {
      // looks are current value of editFieldRef and focuses on that element it references
      editFieldRef.current.focus()
    } 
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing])

  return(
    <li className='todo'>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}

export default Todo