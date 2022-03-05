import React from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import './Tasks.scss';
import List from '../List';
import editSvg from '../../img/edit.svg';
import AddTask from '../AddTask';

const Tasks = ({ list, lists, tasks, onEditTitle, onAdd }) => {
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
	return (
		<div className="tasks">
			<h2 className="tasks__title">
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
					</div>
				))}
			</div>
			<AddTask onAdd={onAdd} list={list} tasks={tasks} />
		</div>
	);
};

export default Tasks;
