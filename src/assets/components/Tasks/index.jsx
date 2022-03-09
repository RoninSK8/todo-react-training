import React from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import './Tasks.scss';
import Task from './Task';
import editSvg from '../../img/edit.svg';
import AddTask from '../AddTask';

const Tasks = ({
	list,
	lists,
	colors,
	tasks,
	onEditTitle,
	onEditTask,
	onAdd,
	onRemove,
}) => {
	const currentTasks = tasks
		? tasks.filter((task) => task.listId === list.id)
		: [];

	const onEditListTitle = (id) => {
		const newTitle = window.prompt('Название списка', list.name);

		if (newTitle) {
			const db = getDatabase();
			const updatedData = lists.map((list) => {
				if (list.id === id) {
					list.name = newTitle;
				}
				return list;
			});
			const updates = {};
			updates['/lists/'] = updatedData;
			update(ref(db), updates).then(onEditTitle(id, newTitle));
		}
	};

	const onRemoveTask = (removedTask) => {
		const db = getDatabase();
		let updatedData = tasks.filter((task) => task.id !== removedTask.id);
		if (updatedData.length === 0) {
			updatedData = [{}];
		}
		const updates = {};
		updates['/tasks/'] = updatedData;
		update(ref(db), updates)
			.then(() => onRemove(removedTask))
			.catch((e) => console.log(e));
	};

	const onEditTaskText = (id, text) => {
		const newText = window.prompt('Название задачи', text);

		if (newText) {
			const db = getDatabase();
			let updatedTask;
			const updatedData = tasks.map((task) => {
				if (task.id === id) {
					task.text = newText;
					updatedTask = task;
				}
				return task;
			});
			const updates = {};
			updates['/tasks/'] = updatedData;
			update(ref(db), updates).then(onEditTask(id, updatedTask));
		}
	};

	const onToggleComplete = (id) => {
		const db = getDatabase();
		let updatedTask;
		const updatedData = tasks.map((task) => {
			if (task.id === id) {
				task.completed = !task.completed;
				updatedTask = task;
			}
			return task;
		});
		const updates = {};
		updates['/tasks/'] = updatedData;
		update(ref(db), updates).then(onEditTask(id, updatedTask));
	};

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
					onClick={() => onEditListTitle(list.id, list.name)}
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
			<AddTask onAdd={onAdd} list={list} tasks={tasks} />
		</div>
	);
};

export default Tasks;
