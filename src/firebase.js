import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL:
		"https://todo-react-training-abad0-default-rtdb.europe-west1.firebasedatabase.app/",
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// Get a list of cities from your database
// async function getCities(db) {
// 	const citiesCol = collection(db, "cities");
// 	const citySnapshot = await getDocs(citiesCol);
// 	const cityList = citySnapshot.docs.map((doc) => doc.data());
// 	return cityList;
// }
