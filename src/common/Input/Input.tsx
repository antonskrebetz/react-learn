import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './Input.module.css';

interface IInputProps {
	labelText?: string;
	placeholderText: string;
	onChange: any;
	addClass?: string;
	id: string;
	value: string | number;
	isNumberValue?: boolean;
	searchInput?: boolean;
	durationInput?: boolean;
}

export const Input = ({
	labelText,
	placeholderText,
	onChange,
	addClass,
	id,
	value,
	searchInput,
	durationInput,
}: IInputProps) => {
	const [error, setError] = useState(false);

	const heandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
		if (event.target.value.length < 2) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<div className={classnames(addClass, styles.inputBlock)}>
			{labelText && (
				<label className={styles.label} htmlFor={id}>
					{labelText}
				</label>
			)}
			<input
				className={styles.input}
				type='text'
				onChange={heandleInput}
				id={id}
				placeholder={placeholderText}
				value={value}
			/>
			{error && !searchInput && !durationInput && (
				<div style={{ marginTop: '3px', color: 'red', fontSize: '10px' }}>
					Should be more than 2 symbols
				</div>
			)}
		</div>
	);
};
