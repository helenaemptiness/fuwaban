import { useEffect, useRef, useState } from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import styles from './BoardListItem.module.css';
import BoardListItemForm from '../BoardListItemForm/BoardListItemForm';


function BoardListItem({ title, onBoardClick, children, isActive, isForm = false, onEdit, onDelete, isFormOpen, isFormClosing }) {
    const [isEditing, setIsEditing] = useState(false)
    const [boardTitle, setBoardTitle] = useState(title)
    const formRef = useRef(null)

    const handleEditClick = (e) => {
        e.stopPropagation()
        setIsEditing(true)
    }

    const editBoardTitle = (title) => {
        setBoardTitle(title)
        onEdit(title)

    }

    const handleEditSubmit = (newTitle) => {
        editBoardTitle(newTitle)
        setIsEditing(false)

    }

    const handleEditCancel = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        if (!isActive && isEditing) {
            setIsEditing(false)
        }
    }, [isActive, isEditing])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                handleEditCancel();
            }
            
        };

        if (isEditing ) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isEditing])

    const handleItemClick = (e) => {
        if (!isForm) {
            onBoardClick(e)
        }
    }

    return (
        
        <div 
            className={`
                    ${styles.list__item} 
                    ${isActive ? styles.current__item : ''} 
                    ${isForm ? styles.form__item : ''}
                    ${isFormOpen ? styles.open : ''}
                    ${isFormClosing ? styles.closing : ''}
                    `}
            onClick={handleItemClick}
        >
            {!isEditing && (boardTitle)}

            {!isForm && isActive && !isEditing && (
                
            <div className={styles.item__instruments}>
                <EditButton onClick={handleEditClick} color={'#FFFFFF'}/>
                <DeleteButton onClick={onDelete} color={'#FFFFFF'}/>
            </div>
            
            )}
            {isEditing && (
                <BoardListItemForm 
                    ref={formRef}
                    initialTitle={boardTitle}
                    onEdit={handleEditSubmit}
                    onCancel={handleEditCancel}
                    isEditMode={true}
                    
                />
            )}
            
            {children}
        </div>
    );
}

export default BoardListItem