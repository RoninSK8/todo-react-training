import React from 'react';
import { useParams } from 'react-router-dom';

import AddTask from '../AddTask';
import Task from './Task';
import './Tasks.scss';
import editSvg from '../../img/edit.svg';

const Tasks = ({
	list,
	lists,
	colors,
	tasks,
	onEditListTitle,
	onEditTaskText,
	onAddTask,
	onRemoveTask,
	onToggleComplete,
}) => {
	const { listId } = useParams();

	let currentList;
	list
		? (currentList = list)
		: (currentList = lists.filter((list) => list.id === listId)[0]);

	const currentTasks = tasks
		? tasks.filter((task) => task.listId === currentList.id)
		: [];

	return (
		<div className="tasks">
			<h2
				style={{
					color: colors.find((color) => color.id === currentList.colorId).hex,
				}}
				className="tasks__title"
			>
				{currentList.name}
				<img
					className="icon"
					onClick={() => onEditListTitle(currentList)}
					src={editSvg}
					alt="Edit icon"
				/>
			</h2>
			<div className="tasks__items">
				{!currentTasks.length && <h2>Задачи отсутствуют</h2>}
				{currentTasks.map((task) => (
					<Task
						key={task.id}
						list={currentList}
						onRemoveTask={onRemoveTask}
						onEditTaskText={onEditTaskText}
						onToggleComplete={onToggleComplete}
						{...task}
					/>
				))}
			</div>
			<AddTask
				key={currentList.id}
				onAddTask={onAddTask}
				list={currentList}
				tasks={tasks}
			/>
		</div>
	);
};

export default Tasks;
