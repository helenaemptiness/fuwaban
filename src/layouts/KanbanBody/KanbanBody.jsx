import styles from './KanbanBody.module.css';

function KanbanBody({ children }) {
	return (
		<div className={styles.kanban__body}>
			{children}
		</div>
	);
}

export default KanbanBody