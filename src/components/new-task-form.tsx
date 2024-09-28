import { ChangeEvent, useState } from 'react'
import { PlusCircle } from '@phosphor-icons/react'
import styles from './new-task-form.module.css'

export function NewTaskForm() {
  const [newTaskText, setNewTaskText] = useState('')

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  return (
    <form className={styles.newTaskForm}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTaskText}
        onChange={handleNewTaskChange}
        required={true}
      />

      <button type="submit">
        Criar
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  )
}
