import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Context } from '../../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInScreen from './SignInScreen';

export default function UserPanel() {
	const { auth } = useContext(Context);
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(function () {
				console.log('Successufully Signed out');
				navigate('/');
			})
			.catch(function () {
				console.log('Error Signed out');
			});
	};

	if (user) {
		return (
			<p>
				Welcome, {user.displayName} <br />
				<small>{user.email}</small> <br />
				<button onClick={signOut}>Sign out</button>
			</p>
		);
	} else {
		return null;
	}
}
