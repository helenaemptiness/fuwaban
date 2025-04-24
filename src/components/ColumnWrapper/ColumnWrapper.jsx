import styles from './ColumnWrapper.module.css';

function ColumnWrapper({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
            
        </div>
    );
}

export default ColumnWrapper