import { useRef, useEffect, useState } from 'react';
import styles from './TaskCard.module.css';

function TaskCard({ task, deadline, children, onClose }) {
    const cardRef = useRef(null)
    const [isClosing, setIsClosing] = useState(false);
    const formattedDeadline = deadline 
    ? new Date(deadline).toLocaleDateString('ru-RU') 
    : 'Без срока';

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
        }, 200); // Должно совпадать с длительностью анимации
    };

    return (
        <div 
        className={`${styles.card} ${isClosing ? styles.closing : ''}`}
        ref={cardRef}>
            <span className={styles.title}>{task}</span>
            {children}
            {(!children) && (
                <span className={styles.deadline}>{formattedDeadline}</span>
            )}
        </div>
    );
}

export default TaskCard