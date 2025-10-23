import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import styles from './TaskOptions.module.css';

function TaskOptions({ onEdit, onDelete }) {
    return (
        <div className={styles.options}>
            <EditButton 
                color={'#908799'}
                onClick={onEdit}
            />
            <DeleteButton 
                color={'#908799'}
                onClick={onDelete}
            />
        </div>
    );
}

export default TaskOptions