import { useRef, useEffect, useState } from 'react';
import styles from './TaskCard.module.css';

function TaskCard({ task, deadline, children, onClose, isAddingTask, isFormTask, currentDate }) {
    const cardRef = useRef(null)
    const [isClosing, setIsClosing] = useState(false);
        // const localToday = currentDate.toLocaleDateString('ru-RU')
    const deadlineDate = new Date(deadline)
    const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString('ru-RU') : 'Без срока';
    
    const deadlineDateNew = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate())
    const getDeadlineStatus = (deadline, currentDate, deadlineDateNew) => {
        if (!deadline) return 'none'

        if (currentDate.getTime() === deadlineDateNew.getTime()) {
            return 'today'
        } else if (currentDate > deadlineDateNew) {
            return 'missed'
        } else if (currentDate < deadlineDateNew) {
            return 'pending'
        }
    }

    const deadlineStatus = getDeadlineStatus(deadline, currentDate, deadlineDateNew)
    console.log(deadlineStatus);
    console.log(currentDate);
    console.log(formattedDeadline);
    
    
    
    useEffect(() => {
        if (!children || !onClose) return;

        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                startClosing();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [children, onClose]);

    const startClosing = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 360); 
    };

    return (
        <div 
        className={`${styles.card} ${isClosing ? styles.closing : ''} ${isAddingTask ? styles.moving : ''} ${isFormTask ? styles.open : ''}`}
        ref={cardRef}>
            <span className={styles.title}>{task}</span>
            {children}
            {(!children) && (
                <span className={`${styles.deadline} ${styles[deadlineStatus]}`}>{formattedDeadline}</span>
            )}
        </div>
    );
}

export default TaskCard