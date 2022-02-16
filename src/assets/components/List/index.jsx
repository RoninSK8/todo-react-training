import React from 'react';
import classNames from 'classnames';
import closeSvg from '../../img/close.svg';

import './List.scss';

const List = ({ items, colors }) => {
	console.log(items, colors);
	return (
		<ul className="list">
			{items.map((item, index) => (
				<li key={index}>
					{item.icon ? (
						item.icon
					) : (
						<i
							className="badge"
							style={{
								background: colors.find((color) => color.id === item.colorId)
									.hex,
							}}
						></i>
					)}
					<span>{item.name}</span>
				</li>
			))}
		</ul>
	);
};

export default List;
