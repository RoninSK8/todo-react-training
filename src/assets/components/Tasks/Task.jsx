import React from 'react';

import editSvg from '../../img/edit.svg';
import removeSvg from '../../img/close.svg';

export default function Task({
	onRemoveTask,
	onEditTaskText,
	onToggleComplete,
	completed,
	text,
	id,
}) {
	return (
		<div className="tasks__item" key={id}>
			<div className="checkbox">
				<input
					onChange={() => onToggleComplete(id)}
					id={`task-${id}`}
					type="checkbox"
					checked={completed}
				/>
				<label htmlFor={`task-${id}`}>
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
			<p style={{ textDecoration: completed && 'line-through' }}>{text}</p>
			<div className="actions">
				<img
					className="icon"
					onClick={() => onEditTaskText(id, text)}
					src={editSvg}
					alt="Edit icon"
				/>
				<img
					className="list__remove-icon icon"
					onClick={() => onRemoveTask(id)}
					src={removeSvg}
					alt="Remove icon"
				/>
			</div>
		</div>
	);
}
