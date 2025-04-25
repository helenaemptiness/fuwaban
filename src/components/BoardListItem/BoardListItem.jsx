import styles from './BoardListItem.module.css';


function BoardListItem({ title, children }) {
    return (
        <div className={styles.list__item}>
            {title}
            {children}
        </div>
    );
}

export default BoardListItem