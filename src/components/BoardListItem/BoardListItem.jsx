import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import styles from './BoardListItem.module.css';


function BoardListItem({ title, onBoardClick, children, isActive, isForm = false, onEditClick, id }) {


    const clickBoard = () => {
        if (!isForm) {
            onBoardClick()
        }
    };
    {console.log(isForm)}
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
            {!isForm && isActive && (
                
            <div className={styles.item__instruments}>
                <EditButton onClick={() => console.log('ok')
                }/>
                <DeleteButton onClick={() => console.log('ok')
                }/>
            </div>
            
            )}
            
            {children}
        </div>
    );
}

export default BoardListItem