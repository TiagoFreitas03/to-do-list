import { FormEvent, useState } from 'react'

import '../styles/new-task-form.css'

interface NewTaskFormProps {
	onAddTask: (description: string) => void
}

export function NewTaskForm({ onAddTask }: NewTaskFormProps) {
	const [description, setDescription] = useState('')

	function handleAddTaskFormSubmit(e: FormEvent) {
		e.preventDefault()

		if (description === '')
			return alert('Informe a tarefa')

		onAddTask(description)
		setDescription('')
	}

	return (
		<form onSubmit={handleAddTaskFormSubmit}>
			<input
				type="text"
				value={description}
				onChange={e => setDescription(e.target.value)}
				autoFocus
				placeholder='O que precisa ser feito?'
			/>

			<button type="submit">Adicionar</button>
		</form>
	)
}
