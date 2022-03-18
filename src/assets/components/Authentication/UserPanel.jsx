import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import { Context } from '../../../index';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserPanel() {
	const { auth } = useContext(Context);
	const [user, loading, error] = useAuthState(auth);

	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(function () {
				console.log('Successufully Signed out');
			})
			.catch(function () {
				console.log('Error Signed out');
			});
	};

	// useEffect(() => {
	// 	const authObserver = firebase.auth().onAuthStateChanged((user) => {
	// 		setUser(user);
	// 	});
	// 	return authObserver;
	// });

	return (
		<p>
			Welcome, {user.displayName} <br />
			<small>{user.email}</small> <br />
			<button onClick={signOut}>Sign out</button>
		</p>
	);
}
