import { forwardRef, useEffect, useState } from 'react';
import styles from './BoardListItemForm.module.css';
import Button from '../Button/Button';


const BoardListItemForm = forwardRef(({ 
    onAddBoard, onEdit, onCancel, isEditMode = false, initialTitle = '' }, ref) => {
    const [boardTitle, setBoardTitle] = useState('')
    
    useEffect(() => {
        setBoardTitle(initialTitle)
    }, [initialTitle])

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!boardTitle.trim()) return;

        if (isEditMode) {
            onEdit(boardTitle.trim())
        } else {

            const newBoard = {
                id: Date.now(),
                title: boardTitle,
                columns: [
                    {
                        id: 1,
                        title: "Нет статуса",
                        type: "backlog",
                        color: "#8646c1",
                        tasks: []
                    },
                    {
                        id: 2,
                        title: "Запланировано",
                        type: "todo",
                        color: "#908799",
                        tasks: []
                    },
                    {
                        id: 3,
                        title: "В процессе",
                        type: "progress",
                        color: "#E79690",
                        tasks: []
                    },
                    {
                        id: 4,
                        title: "Завершено",
                        type: "completed",
                        color: "#74B97C",
                        tasks: []
                    }
                ]
            };

            
            onAddBoard(newBoard);
        }
        setBoardTitle('');
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        }
        setBoardTitle(initialTitle)
    }

    return (
        <form ref={ref} className={styles.item__form} onSubmit={handleSubmit}>
            <input 
                autoFocus
                className={styles.input}
                type="text" value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                placeholder={isEditMode ? 'Редактировать доску' : 'Новая доска'}
                onKeyDown={(e) => {
                    if (e.key === 'Escape' && onCancel) {
                        handleCancel();
                    }
                }}
            />
            <div className={styles.form__buttons}>
                {isEditMode && (
                    <Button type="button" name="X" onClick={handleCancel}/>
                )}
                <Button type="submit" name="ОК"/>
            </div>
        </form>
    );
})
BoardListItemForm.displayName = 'BoardListItemForm'

export default BoardListItemForm