import { useState } from 'react';
import styles from './BoardListItemForm.module.css';


function BoardListItemForm({ onAddBoard }) {
    const [boardTitle, setBoardTitle] = useState('')
    const addBoardItem = (event) => {
        event.preventDefault();

        if (!boardTitle.trim()) return;

        const existingBoards = JSON.parse(localStorage.getItem('boards')) || [];

        const newBoard = {
            id: Date.now(),
            title: boardTitle,
            columns: []
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
        </form>
    );
}

export default BoardListItemForm