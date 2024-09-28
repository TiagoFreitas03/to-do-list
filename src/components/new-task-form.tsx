import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from '@phosphor-icons/react'
import styles from './new-task-form.module.css'

interface NewTaskFormProps {
  onCreateTask: (taskName: string) => void
}

export function NewTaskForm({ onCreateTask }: NewTaskFormProps) {
  const [taskName, setTaskName] = useState('')

  function handleTaskNameChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value)
  }

  function handleNewTaskFormSubmit(event: FormEvent) {
    event.preventDefault()

    if (taskName !== '') {
      onCreateTask(taskName)
    }

    setTaskName('')
  }

  return (
    <form className={styles.newTaskForm} onSubmit={handleNewTaskFormSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={taskName}
        onChange={handleTaskNameChange}
        required={true}
      />

      <button type="submit">
        Criar
        <PlusCircle size={18} weight="bold" />
      </button>
    </form>
  )
}
