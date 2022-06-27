import classnames from 'classnames';
import styles from './Button.module.css';

interface IButtonProps {
	buttonText: string;
	onClick?: any;
	addClass?: string;
}

export const Button = ({ buttonText, onClick, addClass }: IButtonProps) => {
	return (
		<button className={classnames(addClass, styles.button)} onClick={onClick}>
			{buttonText}
		</button>
	);
};
