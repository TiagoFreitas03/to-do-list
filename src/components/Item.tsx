import clsx from "clsx"

import { Task } from "../interfaces/Task"
import '../styles/item.css'

interface ItemProps {
	task: Task
	onRemove: () => void
	onToggleCompleted: () => void
}

export function Item({ task, onRemove, onToggleCompleted }: ItemProps) {
	return (
		<li key={task.createdAt.toString()}>
			<div>
				<label className={clsx('checkbox-label', { 'completed': task.completed })}>
					{ task.description }

					<input type='checkbox' checked={task.completed} onChange={onToggleCompleted} />

					<span className="checkmark" />
				</label>
			</div>

			<button onClick={onRemove}>
				&times;
			</button>
		</li>
	)
}
