import styles from './Button.module.css';
import cn from 'classnames';

function Button({ name }) {
    return (
        <button className={styles.button}>{name}</button>
    );
}

export default Button