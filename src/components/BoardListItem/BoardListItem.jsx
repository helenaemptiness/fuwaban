import styles from './BoardListItem.module.css';


function BoardListItem({ title, onBoardClick, children, isActive, isForm }) {


    const clickBoard = () => {
        if (!isForm) {
            onBoardClick()
        }
    };

    return (
        
        <div 
            className={`
                    ${styles.list__item} 
                    ${isActive ? styles.current__item : ''} 
                    ${isForm ? styles.form__item : ''}
                    `}
            onClick={clickBoard}
        >
            {title}
            {children}
        </div>
    );
}

export default BoardListItem