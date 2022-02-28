import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import closeSvg from '../../img/close.svg';
import List from '../List';
import './AddList.scss';

const AddList = ({ lists, colors, onAdd }) => {
	const [isPopupActive, setPopupActive] = useState(false);
	const [selectedColor, selectColor] = useState(1);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectColor(colors[0].id);
		}
	}, [colors]);

	const onClickBadge = (colorId) => {
		selectColor(colorId);
	};

	const onClickPopup = () => {
		setPopupActive(!isPopupActive);
	};

	const addList = () => {
		if (!inputValue) {
			alert('Введите название списка');
			return;
		}
		const db = getDatabase();
		const listData = {
			id: nanoid(5),
			name: inputValue,
			colorId: selectedColor,
		};
		let updatedData;
		lists ? (updatedData = [...lists, listData]) : (updatedData = [listData]);
		// if (lists) {
		// 	const updatedData = [...lists, listData];
		// } else {
		// 	const updatedData = [listData];
		// }

		const updates = {};
		updates['/lists/'] = updatedData;
		setPopupActive(false);
		selectColor(1);
		setInputValue('');
		update(ref(db), updates)
			.then(onAdd(listData))
			.catch(console.log('не удалось добавить данные на сервер'));
	};

	return (
		<div className="add-list">
			<List
				onClick={onClickPopup}
				items={[
					{
						icon: (
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 1V15"
									stroke="#7c7c7c"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M1 8H15"
									stroke="#7c7c7c"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						),
						name: 'Добавить список',
					},
				]}
			/>
			{isPopupActive && (
				<div className="add-list__popup">
					<img
						onClick={() => setPopupActive(false)}
						className="add-list__close"
						src={closeSvg}
						alt="Close button"
					/>
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						className="field"
						type="text"
						placeholder="Название списка"
					/>
					<div className="add-list__colors">
						{colors &&
							colors.map((color) => (
								<i
									className={classNames(
										'badge',
										selectedColor === color.id && 'active'
									)}
									onClick={() => onClickBadge(color.id)}
									key={color.id}
									style={{
										background: color.hex,
									}}
								></i>
							))}
					</div>
					<button onClick={addList} className="button">
						Добавить
					</button>
				</div>
			)}
		</div>
	);
};

export default AddList;
