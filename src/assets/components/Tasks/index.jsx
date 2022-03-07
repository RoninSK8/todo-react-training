import React from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import './Tasks.scss';
import List from '../List';
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
		// lists ? (updatedData = [...lists, listData]) : (updatedData = [listData]);
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
			const updatedData = tasks.map((task) => {
				if (task.id === id) {
					task.text = newText;
				}
				return task;
			});
			const updates = {};
			updates['/tasks/'] = updatedData;
			update(ref(db), updates).then(onEditTask(id, newText));
		}
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
					<div className="tasks__item" key={task.id}>
						<div className="checkbox">
							<input id={`task-${task.id}`} type="checkbox" />
							<label htmlFor={`task-${task.id}`}>
								<svg
									width="11"
									height="8"
									viewBox="0 0 11 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
										stroke="#000"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</label>
						</div>
						<input readOnly type="text" value={task.text} />
						<img
							onClick={() => onEditTaskText(task.id, task.text)}
							src={editSvg}
							alt="Edit icon"
						/>
						<svg
							className="list__remove-icon"
							onClick={() => onRemoveTask(task)}
							width="11"
							height="11"
							viewBox="0 0 11 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
								fill="#E3E3E3"
							/>
						</svg>
					</div>
				))}
			</div>
			<AddTask onAdd={onAdd} list={list} tasks={tasks} />
		</div>
	);
};

export default Tasks;
