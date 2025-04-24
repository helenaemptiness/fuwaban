import styles from './TaskCard.module.css';

function TaskCard({ task, deadline }) {
    return (
        <div className={styles.card}>
            <span className={styles.title}>{task}</span>
            <span className={styles.deadline}>{deadline}</span>
        </div>
    );
}

export default TaskCard