import { useEffect, useRef, useState } from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import styles from './BoardListItem.module.css';
import BoardListItemForm from '../BoardListItemForm/BoardListItemForm';


function BoardListItem({ title, onBoardClick, children, isActive, isForm = false, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef(null)
    const handleEditClick = (e) => {
        e.stopPropagation()
        setIsEditing(true)
    }

    const handleEditSubmit = (newTitle) => {
        onEdit(newTitle)
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

        if (isEditing) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isEditing])

    const handleItemClick = (e) => {
        if (!isEditing) {
            onBoardClick(e)
        }
    }

    return (
        
        <div 
            className={`
                    ${styles.list__item} 
                    ${isActive ? styles.current__item : ''} 
                    ${isForm ? styles.form__item : ''}
                    `}
            onClick={handleItemClick}
        >
            {!isEditing && (title)}

            {!isForm && isActive && !isEditing && (
                
            <div className={styles.item__instruments}>
                <EditButton onClick={handleEditClick}/>
                <DeleteButton onClick={onDelete}/>
            </div>
            
            )}
            {isEditing && (
                <BoardListItemForm 
                    ref={formRef}
                    initialTitle={title}
                    onSubmit={handleEditSubmit}
                    onCancel={handleEditCancel}
                    isEditMode={true}
                />
            )}
            
            {children}
        </div>
    );
}

export default BoardListItem