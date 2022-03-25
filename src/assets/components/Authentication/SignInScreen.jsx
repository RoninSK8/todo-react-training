import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import App from '../../../App';

var uiConfig = {
	signInFlow: 'popup',
	signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
	// callbacks: {
	// 	signInSuccessWithAuthResult: async (authResult) => {
	// 		const userInfo = authResult.additionalUserInfo;
	// 		if (userInfo.isNewUser && userInfo.providerId === 'password') {
	// 			try {
	// 				await authResult.user.sendEmailVerification();
	// 				console.log('Check your email.');
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 		return false;
	// 	},
	// },
};

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

firebase.initializeApp(firebaseConfig);

const SignInScreen = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const authObserver = firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
		});
		return authObserver;
	}, [user]);

	if (user) {
		return <App />;
	} else {
		return (
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		);
	}
};

export default SignInScreen;
