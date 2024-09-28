import './global.css'
import styles from './app.module.css'
import { useState } from 'react'
import { Header } from './components/header'
import { NewTaskForm } from './components/new-task-form'
import clipboard from './assets/clipboard.svg'
import { Task } from './components/task'

export interface TaskData {
  id: string
  name: string
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<TaskData[]>([])

  function createTask(taskName: string) {
    const newTask = {
      id: String(new Date().getTime()),
      name: taskName,
      isCompleted: false
    }

    setTasks(state => [...state, newTask])
  }

  function toggleCompletedTask(id: string) {
    setTasks((state) => {
      return state.map(task => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted }
        }

        return task
      })
    })
  }

  function removeTask(id: string) {
    setTasks((state) => state.filter(task => task.id !== id))
  }

  const tasksAmount = tasks.length
  const completedTasksAmount = tasks.filter((task) => task.isCompleted).length

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <NewTaskForm onCreateTask={createTask} />

        <div className={styles.listWrapper}>
          <header>
            <strong>Tarefas criadas <span>{ tasksAmount }</span></strong>

            <strong>
              Concluidas
              {
                tasksAmount === 0 ?
                <span>0</span> :
                <span>{ completedTasksAmount } de { tasksAmount }</span>
              }
            </strong>
          </header>

          <main>
            {
              tasks.length ?
              tasks.map(task => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    onToggleCompleted={toggleCompletedTask}
                    onRemove={removeTask}
                  />
                )
              }) :
              <div className={styles.emptyList}>
                <img src={clipboard} />

                <strong>Você ainda não tem tarefas cadastradas</strong>

                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            }
          </main>
        </div>
      </div>
    </>
  )
}
