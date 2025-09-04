import styles from './Button.module.css';
import cn from 'classnames';

function Button({ name, type, onClick }) {
    return (
        <button 
        type={type}
        className={styles.button}
        onClick={onClick}>
            {name}
        </button>
    );
}

export default Button