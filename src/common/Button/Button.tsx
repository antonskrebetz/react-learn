import classnames from 'classnames';
import styles from './Button.module.css';

interface IButtonProps {
	buttonText: string;
	onClick?: any;
	addClass?: string;
	buttonType?: 'button' | 'submit' | 'reset';
}

export const Button = ({
	buttonText,
	onClick,
	addClass,
	buttonType = 'button',
}: IButtonProps) => {
	return (
		<button
			type={buttonType}
			className={classnames(addClass, styles.button)}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};
