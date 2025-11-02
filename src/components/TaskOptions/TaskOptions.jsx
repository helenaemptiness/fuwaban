import ColumnSelect from '../ColumnSelect/ColumnSelect';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import MoveButton from '../MoveButton/MoveButton';
import styles from './TaskOptions.module.css';

function TaskOptions({ onEdit, onDelete, onMove, onColumnSelecting, currentColumnTitle, onSelect }) {
    return (
        <div className={styles.options}>
            <MoveButton
                color={'#c68dffff'}
                onClick={onMove}
            />
            {onColumnSelecting && (
                <ColumnSelect
                    firstOption={'Нет статуса'}
                    secondOption={'Запланировано'}
                    thirdOption={'В процессе'}
                    fourthOption={'Завершено'}
                    currentOption={currentColumnTitle}
                    onSelect={onSelect}
                />
            )}
            {!onColumnSelecting && (
                <EditButton 
                    color={'#908799'}
                    onClick={onEdit}
                />
            )}
            {!onColumnSelecting && (
                <DeleteButton 
                    color={'#908799'}
                    onClick={onDelete}
                />
            )}
        </div>
    );
}

export default TaskOptions