import { CheckCircle, Circle, Trash } from '@phosphor-icons/react'
import { TaskData } from '../app'
import styles from './task.module.css'
import { useState } from 'react'

interface TaskProps {
  task: TaskData
  onToggleCompleted: (id: string) => void
  onRemove: (id: string) => void
}

export function Task({ task, onToggleCompleted, onRemove }: TaskProps) {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }

  function handleToggleCompleted() {
    onToggleCompleted(task.id)
  }

  function handleRemoveTask() {
    onRemove(task.id)
  }

  return (
    <div className={task.isCompleted ? styles.completed : ''}>
      <div className={styles.task}>
        <button onClick={handleToggleCompleted} className={styles.check}>
          {
            task.isCompleted ?
            <CheckCircle
              weight="fill"
              size={20}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            /> :
            <Circle
              weight={isHovered ? 'duotone' : 'regular'}
              size={20}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          }
          </button>

          <span className={styles.taskName}>
            { task.name }
          </span>

          <button onClick={handleRemoveTask} title="Excluir tarefa" className={styles.trash}>
            <Trash size={20} />
          </button>
      </div>
    </div>
  )
}
