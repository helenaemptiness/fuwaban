import styles from './Column.module.css';
import cn from 'classnames';

function Column({ title, color, children, onDragOver, onDrop, isOver }) {
    const handleDragOver = (e) => {
        e.preventDefault();
        if (onDragOver) {
            onDragOver(e);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (onDrop) {
            onDrop(e);
        }
    };

    const columnClasses = [
        styles.column,
        isOver ? styles.over : ''
    ].filter(Boolean).join(' ');
    return (
        <div 
            className={columnClasses}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h2 className={cn(styles.column__title, styles[color])}>
                {title}
            </h2>
            {children}
            
        </div>
    );
}

export default Column