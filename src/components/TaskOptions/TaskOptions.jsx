import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import MoveButton from '../MoveButton/MoveButton';
import styles from './TaskOptions.module.css';

function TaskOptions({ onEdit, onDelete, onMove }) {
    return (
        <div className={styles.options}>
            <MoveButton
                color={'#c68dffff'}
                onClick={onMove}
            />
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