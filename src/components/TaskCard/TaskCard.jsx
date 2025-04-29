import styles from './TaskCard.module.css';

function TaskCard({ task, deadline, children }) {
    return (
        <div className={styles.card}>
            <span className={styles.title}>{task}</span>
            <span className={styles.deadline}>{deadline}</span>
            {children}
        </div>
    );
}

export default TaskCard