import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';

import addSvg from '../../img/add.svg';
import './AddTask.scss';

const AddTask = ({ list, tasks, onAdd }) => {
	const [inputValue, setInputValue] = useState('');
	const [isFormActive, setFormActive] = useState(false);

	const toggleFormActive = () => {
		setFormActive(!isFormActive);
		setInputValue('');
	};

	const addTask = () => {
		if (!inputValue) {
			alert('Введите название списка');
			return;
		}
		const db = getDatabase();
		const taskData = {
			id: nanoid(5),
			completed: false,
			text: inputValue,
			listId: list.id,
		};
		let updatedData;
		tasks ? (updatedData = [...tasks, taskData]) : (updatedData = [taskData]);

		const updates = {};
		updates['/tasks/'] = updatedData;
		setFormActive(false);
		setInputValue('');
		update(ref(db), updates)
			.then(onAdd(taskData))
			.catch(console.log('не удалось добавить данные на сервер'));
	};

	return (
		<div className="add-task">
			{!isFormActive ? (
				<div onClick={toggleFormActive} className="add-task__button">
					<img src={addSvg} alt="Add icon" />
					<span>Новая задача</span>
				</div>
			) : (
				<div className="add-task__form">
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						className="add-task__input field"
						type="text"
						placeholder="Название задачи"
					/>
					<button onClick={addTask} className="add-task__confirm-button button">
						Добавить задачу
					</button>
					<button
						onClick={toggleFormActive}
						className="add-task__cancel-button button"
					>
						Отмена
					</button>
				</div>
			)}
		</div>
	);
};

export default AddTask;
