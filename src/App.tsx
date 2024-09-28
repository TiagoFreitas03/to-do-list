import './global.css'
import styles from './app.module.css'
import { Header } from './components/header'
import { NewTaskForm } from './components/new-task-form'
import clipboard from './assets/clipboard.svg'

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <NewTaskForm />

        <div className={styles.listWrapper}>
          <header>
            <strong>Tarefas criadas <span>0</span></strong>

            <strong>Concluidas <span>0</span></strong>
          </header>

          <main>
            <div className={styles.emptyList}>
              <img src={clipboard} />

              <strong>Você ainda não tem tarefas cadastradas</strong>

              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
