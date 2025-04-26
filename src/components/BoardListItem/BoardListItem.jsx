import { useState } from 'react';
import styles from './BoardListItem.module.css';


function BoardListItem({ title, onBoardClick, children, isActive }) {


    const clickBoard = () => {
        onBoardClick()
    };

    return (
        
        <div 
            className={`${styles.list__item} ${isActive ? styles.current__item : ''}`}
            onClick={clickBoard}
        >
            {title}
            {children}
        </div>
    );
}

export default BoardListItem