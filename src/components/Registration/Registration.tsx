import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import styles from './Registration.module.css';

export const Registration = () => {
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const navigate = useNavigate();

	const onChangeNameInput = (value: string) => {
		setNameInput(value);
	};

	const onChangeEmailInput = (value: string) => {
		setEmailInput(value);
	};

	const onChangePasswordInput = (value: string) => {
		setPasswordInput(value);
	};

	const onSubmitButton = async () => {
		try {
			const result = await fetch('http://localhost:4000/register', {
				method: 'POST',
				body: JSON.stringify({
					name: nameInput,
					email: emailInput,
					password: passwordInput,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (result.ok) {
				navigate('/login');
			} else {
				alert('something went wrong');
			}
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2 className={styles.title}>Registration</h2>
					<form>
						<Input
							labelText='Name'
							placeholderText='Enter name'
							id='name'
							value={nameInput}
							onChange={onChangeNameInput}
							addClass={styles.input}
						/>
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
							buttonText='Registration'
							onClick={onSubmitButton}
						/>
					</form>
					<div className={styles.accountMessage}>
						If you have an account you can{' '}
						<Link to='/login' className={styles.accountBtn}>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
