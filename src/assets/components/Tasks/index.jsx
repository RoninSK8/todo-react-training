import React from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import './Tasks.scss';
import Task from './Task';
import editSvg from '../../img/edit.svg';
import AddTask from '../AddTask';
import { useParams } from 'react-router-dom';

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
	// console.log('lists', lists);
	// console.log('colors', colors);
	// console.log('currentList', currentList);
	// console.log('listId', listId);
	// console.log('currentList.colorId', currentList.colorId);
	// const colorX = colors.find((color) => color.id === currentList.colorId);
	// console.log('color', colorX);

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
			<AddTask onAddTask={onAddTask} list={currentList} tasks={tasks} />
		</div>
	);
};

export default Tasks;
