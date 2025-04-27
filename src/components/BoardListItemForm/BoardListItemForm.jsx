import { useState } from 'react';
import styles from './BoardListItemForm.module.css';
import Button from '../Button/Button';


function BoardListItemForm({ onAddBoard }) {
    const [boardTitle, setBoardTitle] = useState('')
    const addBoardItem = (event) => {
        event.preventDefault();

        if (!boardTitle.trim()) return;

        const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];

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

        const updatedBoards = [...existingBoards, newBoard];

        localStorage.setItem('boards', JSON.stringify(updatedBoards));
        
        onAddBoard(newBoard);
        setBoardTitle('');

    }
    return (
        <form className={styles.item__form} onSubmit={addBoardItem}>
            <input className={styles.input}
            type="text" value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder="Новая доска"/>
            <Button type="submit" name="ОК"/>
        </form>
    );
}

export default BoardListItemForm