import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import styles from './Login.module.css';
import { fetchLoginUser } from '../../store/user/userSlice';
import { useAppDispatch } from '../../store/store';

export const Login = () => {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onChangeEmailInput = (value: string) => {
		setEmailInput(value);
	};

	const onChangePasswordInput = (value: string) => {
		setPasswordInput(value);
	};

	const user = JSON.stringify({ email: emailInput, password: passwordInput });

	const onSubmitButton = async () => {
		try {
			const result = await dispatch(fetchLoginUser(user)).unwrap();
			if (result.successful) {
				localStorage.setItem('access_token', result.result);
				navigate('/courses');
			} else {
				alert('Email or password is wrong');
			}
		} catch (error) {
			alert('Smth went wrong login system');
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
