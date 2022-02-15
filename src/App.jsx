import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import List from "./assets/components/List";

function App() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		const dbRef = ref(getDatabase());
		get(child(dbRef, "lists"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setLists(snapshot.val());
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List items={lists} />
			</div>
			<div className="todo__tasks">Tasks</div>
		</div>
	);
}

export default App;
