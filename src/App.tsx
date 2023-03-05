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

	function removeTask(index: number) {
		const aux = tasks.slice()
		aux.splice(index, 1)
		setTasks(aux)
	}

	function toggleCompleted(index: number) {
		const aux = tasks.slice()
		aux[index].completed = !aux[index].completed
		setTasks(aux)
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
					filteredTasks.map((task, index) => (
						<Item
							key={task.id}
							task={task}
							onRemove={() => removeTask(index)}
							onToggleCompleted={() => toggleCompleted(index)}
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
