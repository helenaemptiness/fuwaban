import styles from './Button.module.css';

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