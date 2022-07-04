import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import styles from './Login.module.css';

export const Login = () => {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const navigate = useNavigate();

	const onChangeEmailInput = (value: string) => {
		setEmailInput(value);
	};

	const onChangePasswordInput = (value: string) => {
		setPasswordInput(value);
	};

	const onSubmitButton = async () => {
		try {
			const request = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify({
					email: emailInput,
					password: passwordInput,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const response = await request.json();

			if (response.successful) {
				localStorage.setItem('access_token', response.result);
				localStorage.setItem('userName', response.user.name);
				navigate('/courses');
			} else {
				alert('Email or password is wrong');
			}
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2 className={styles.title}>Login</h2>
					<form>
						<Input
							labelText='Email'
							placeholderText='Enter email'
							id='email'
							value={emailInput}
							onChange={onChangeEmailInput}
							addClass={styles.input}
						/>
						<Input
							labelText='Password'
							placeholderText='Enter password'
							id='password'
							value={passwordInput}
							onChange={onChangePasswordInput}
							addClass={styles.input}
						/>
						<Button
							addClass={styles.button}
							buttonText='Login'
							onClick={onSubmitButton}
						/>
					</form>
					<div className={styles.accountMessage}>
						If you not have an account you can{' '}
						<Link to='/registration' className={styles.accountBtn}>
							Registration
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};