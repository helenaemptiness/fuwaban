import styles from './Column.module.css';
import cn from 'classnames';

function Column({ title, color, children }) {
    return (
        <div className={styles.column}>
            <h2 className={cn(styles.column__title, styles[color])}>
                {title}
            </h2>
            {children}
            
        </div>
    );
}

export default Column