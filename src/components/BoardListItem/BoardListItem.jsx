import styles from './BoardListItem.module.css';

function BoardListItem({ title }) {
    return (
        <div className={styles.list__item}>
            {title}
        </div>
    );
}

export default BoardListItem