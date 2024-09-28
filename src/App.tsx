import './global.css'
import styles from './app.module.css'
import { Header } from './components/header'
import { NewTaskForm } from './components/new-task-form'

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <NewTaskForm />
      </div>

    </>
  )
}
