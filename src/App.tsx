import { useEffect, useState } from 'react'

import './styles/app.css'
import { NewTaskForm } from './components/NewTaskForm'
import { Task } from './interfaces/Task'
import { Item } from './components/Item'

const filters = ['Todos', 'Incompletos', 'Finalizados']

export function App() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [activeFilter, setActiveFilter] = useState('Todos')

	const uncompleted = tasks.filter(task => !task.completed).length

	const filteredTasks = activeFilter === 'Todos' ? tasks :
		activeFilter === 'Incompletos' ? tasks.filter(task => !task.completed) :
		tasks.filter(task => task.completed)

	useEffect(() => {
		const localTasks = localStorage.getItem('tasks')

		if (localTasks) {
			setTasks(JSON.parse(localTasks))
		}
	}, [])

	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		} else {
			localStorage.removeItem('tasks')
		}
	}, [tasks])

	function addTask(description: string) {
		const newTask = {
			id: new Date().getTime(),
			description,
			createdAt: new Date(),
			completed: false
		}

		const aux = [...tasks, newTask]
		setTasks(aux)

		if (aux.length === 1)
			setActiveFilter('Todos')
	}

	function removeTask(id: number) {
		const aux = tasks.slice()
		const pos = aux.map(task => task.id).findIndex(taskId => taskId === id)

		if (pos >= 0) {
			aux.splice(pos, 1)
			setTasks(aux)
		}
	}

	function toggleCompleted(id: number) {
		const aux = tasks.slice()
		const pos = aux.map(task => task.id).findIndex(taskId => taskId === id)

		if (pos >= 0) {
			aux[pos].completed = !aux[pos].completed
			setTasks(aux)
		}
	}

	function removeCompleted() {
		const aux = tasks.filter(task => !task.completed)
		setTasks(aux)
	}

	return (
		<div className="container">
			<h1>Lista de tarefas</h1>

			<NewTaskForm onAddTask={description => addTask(description)} />

			{
				tasks.length > 0 &&
				<div className='filters'>
					{
						filters.map(filter => (
							<button
								key={filter}
								className={activeFilter === filter ? 'selected' : ''}
								onClick={() => setActiveFilter(filter)}
							>
								{ filter }
							</button>
						))
					}
				</div>
			}

			<ul>
				{
					filteredTasks.map(task => (
						<Item
							key={task.id}
							task={task}
							onRemove={() => removeTask(task.id)}
							onToggleCompleted={() => toggleCompleted(task.id)}
						/>
					))
				}
			</ul>

			{
				tasks.length > 0 &&
				<footer>
					<span>Restante: {uncompleted}</span>

					<button onClick={removeCompleted}>Remover finalizados</button>
				</footer>
			}
		</div>
	)
}
