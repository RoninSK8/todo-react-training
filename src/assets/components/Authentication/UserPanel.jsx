import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Context } from '../../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInScreen from './SignInScreen';
import List from '../List';

export default function UserPanel() {
	const { auth } = useContext(Context);
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const signOut = () => {
		if (window.confirm(`Вы хотите выйти?`)) {
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
		}
	};

	if (user) {
		return (
			<>
				{/* <svg
					width="15"
					height="15"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs></defs>
					<title />
					<g data-name="Layer 7" id="Layer_7">
						<path d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z" />
					</g>
				</svg>
				<p>
					Welcome, {user.displayName} <br />
					<small>{user.email}</small> <br />
					<button onClick={signOut}>Sign out</button>
				</p> */}
				<List
					onClickItem={signOut}
					items={[
						{
							icon: (
								<svg
									width="15"
									height="15"
									viewBox="0 0 32 32"
									xmlns="http://www.w3.org/2000/svg"
								>
									<defs></defs>
									<title />
									<g data-name="Layer 7" id="Layer_7">
										<path d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z" />
									</g>
								</svg>
							),
							name: `${user.displayName}`,
						},
					]}
				/>
			</>
		);
	} else {
		return null;
	}
}
