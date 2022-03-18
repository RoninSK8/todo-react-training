import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import SignInScreen from './assets/components/Authentication/SignInScreen';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL:
		'https://todo-react-training-abad0-default-rtdb.europe-west1.firebasedatabase.app/',
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = firebase.auth();

ReactDOM.render(
	<React.StrictMode>
		<Context.Provider
			value={{
				auth,
				firebase,
			}}
		>
			<Router>
				<SignInScreen />
			</Router>
		</Context.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
