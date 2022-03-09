import React from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import './Tasks.scss';
import Task from './Task';
import editSvg from '../../img/edit.svg';
import AddTask from '../AddTask';

const Tasks = ({
	list,
	colors,
	tasks,
	onEditListTitle,
	onEditTaskText,
	onAddTask,
	onRemoveTask,
	onToggleComplete,
}) => {
	const currentTasks = tasks
		? tasks.filter((task) => task.listId === list.id)
		: [];

	return (
		<div className="tasks">
			<h2
				style={{
					color: colors.find((color) => color.id === list.colorId).hex,
				}}
				className="tasks__title"
			>
				{list.name}
				<img
					onClick={() => onEditListTitle(list)}
					src={editSvg}
					alt="Edit icon"
				/>
			</h2>
			<div className="tasks__items">
				{!currentTasks.length && <h2>Задачи отсутствуют</h2>}
				{currentTasks.map((task) => (
					<Task
						key={task.id}
						list={list}
						onRemoveTask={onRemoveTask}
						onEditTaskText={onEditTaskText}
						onToggleComplete={onToggleComplete}
						{...task}
					/>
				))}
			</div>
			<AddTask onAddTask={onAddTask} list={list} tasks={tasks} />
		</div>
	);
};

export default Tasks;
