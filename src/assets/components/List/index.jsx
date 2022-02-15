import React from "react";
import classNames from "classnames";

import "./List.scss";

const List = (props) => {
	console.log(props);
	return (
		<ul className="list">
			{props.items.map((item) => (
				<li key={item.id}>
					<i></i>
					<span>{item.name}</span>
				</li>
			))}
		</ul>
	);
};

export default List;
