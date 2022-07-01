import logo from './logo.svg';
import styles from './Logo.module.css';

export const Logo = () => {
	return <img className={styles.logo} src={logo} alt={'logo'} />;
};
