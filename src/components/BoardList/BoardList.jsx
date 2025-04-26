import styles from './BoardList.module.css';

function BoardList({ children }) {
    return (
        <div className={styles.board__list}>
            {children}
        </div>
    );
}

export default BoardList