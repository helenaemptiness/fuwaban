import { useRef, useEffect, useState } from 'react';
import styles from './TaskCard.module.css';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import TaskOptions from '../TaskOptions/TaskOptions';
import TaskCardForm from '../TaskCardForm/TaskCardForm'

function TaskCard({ task, deadline, children, onClose, isAddingTask, isEditingTask, isFormTask, currentDate, onEdit, onDeleteClick, isMoving, onEditClick, onEditCancel }) {
    const cardRef = useRef(null)
    const [isCardEditing, setIsCardEditing] = useState(false)
    const [cardDeadline, setCardDeadline] = useState(deadline)
    const [cardTask, setCardTask] = useState(task)
    const [isClosing, setIsClosing] = useState(false);
    const [isHovered, setIsHovered] = useState(false)

    const deadlineDate = new Date(cardDeadline)
    const formattedDeadline = cardDeadline ? new Date(cardDeadline).toLocaleDateString('ru-RU') : 'Без срока';
    
    const deadlineDateNew = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate())
    const getDeadlineStatus = (cardDeadline, currentDate, deadlineDateNew) => {
        if (!cardDeadline) return 'none'

        if (currentDate.getTime() === deadlineDateNew.getTime()) {
            return 'today'
        } else if (currentDate > deadlineDateNew) {
            return 'missed'
        } else if (currentDate < deadlineDateNew) {
            return 'pending'
        }
    }

    const deadlineStatus = getDeadlineStatus(cardDeadline, currentDate, deadlineDateNew)
    
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                if (isCardEditing) {
                    handleEditCancel();
                }

                else if (children && onClose) {
                    startClosing()
                }
            }
        };

        if (isCardEditing || (children && onClose)) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isCardEditing, children, onClose]);

    const startClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 360); 
    };

    const handleMouseEnter = () => {
        if (!children) {
            setIsHovered(true)
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleEditClick = (e) => {
        setIsCardEditing(true)
        onEditClick(e.target)
    }

    const handleEditSubmit = (editedCard) => {
        setCardTask(editedCard.text)
        setCardDeadline(editedCard.deadline)

        if (onEdit) {
            onEdit(editedCard)
        }

        setIsCardEditing(false)

        if (onEditCancel) {
            onEditCancel();
        }
    }
    const handleEditCancel = () => {
        setIsCardEditing(false)

        if (onEditCancel) {
            onEditCancel();
        }
    }

    const cardClasses = [
        styles.card,
        isClosing ? styles.closing : '',
        isAddingTask ? styles.moving : '',
        isMoving ? styles.moving : '', 
        isFormTask ? styles.open : '',
        isEditingTask ? styles.open : '', 
    ].filter(Boolean).join(' ');
    
    return (
        <>
            <div 
            className={cardClasses}
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                {!isCardEditing && (
                    <span className={styles.title}>{cardTask}</span>
                )}
                
                {isCardEditing && (
                    <TaskCardForm
                        formType={'editTask'}
                        task={task}
                        deadline={formatDateForInput(cardDeadline)}
                        noDeadline={deadline ? false : true}
                        onSubmit={handleEditSubmit}
                        onClose={handleEditCancel}
                    />
                )}

                {children}

                {!isCardEditing && !children && (
                <div className={styles.task_infopannel}>
                    {(!children) && (
                        <span className={`${styles.deadline} ${styles[deadlineStatus]}`}>{formattedDeadline}</span>
                    )}
                    {isHovered  && (
                        <TaskOptions
                            onEdit={handleEditClick}
                            onDelete={onDeleteClick}
                        />
                    )}
                </div>
                )}
            </div>

            
        </>
    );
}

export default TaskCard