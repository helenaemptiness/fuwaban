import { useEffect, useRef, useState } from 'react';
import styles from './BoardList.module.css';
import NewItemButton from '../NewItemButton/NewItemButton';
import BoardListItem from '../BoardListItem/BoardListItem';
import BoardListItemForm from '../BoardListItemForm/BoardListItemForm';

function BoardList({ boards, activeBoardId, setActiveBoardId, updateBoards }) {
    const buttonColor = "#8646c1"
    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [isClosingForm, setIsClosingForm] = useState()
    const formRef = useRef(null)
    const buttonRef = useRef(null)


    const handleAddClick = (e) => {
        e.stopPropagation()
        if (isAddingBoard) {
            setIsClosingForm(true);
            setTimeout(() => {
                setIsAddingBoard(false)
                setIsClosingForm(false)
            }, 300);
        } else {
            setIsAddingBoard(true);
            setIsClosingForm(false)
        }
        
        
    }
    
    const addNewBoardItem = (newBoard) => {
        updateBoards([...boards, newBoard]);
        setActiveBoardId(newBoard.id)
        setIsAddingBoard(false)
    };



    const activateBoard = (boardId) => {
        if (isAddingBoard) {
            setIsAddingBoard(false)
        }
        setActiveBoardId(boardId);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }
            if (formRef.current && formRef.current.contains(event.target)) {
                return;
            }
            if (isAddingBoard && !isClosingForm) {
                setIsClosingForm(true);
                setTimeout(() => {
                    setIsAddingBoard(false);
                    setIsClosingForm(false)
                }, 300);
            }
        }
        if (isAddingBoard) {
            document.addEventListener('mousedown', handleClickOutside)

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [isAddingBoard])

    const deleteBoard = (boardId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту доску?')) {
            return;
        }

        updateBoards(boards.filter(board => board.id !== boardId))

        if (activeBoardId === boardId) {
            setActiveBoardId(null)
        }
    }

    const editBoard = (boardId, newTitle) => {

        const updatedBoards = boards.map(board =>
            board.id === boardId ? {...board, title: newTitle} : board
        );
        updateBoards(updatedBoards)

    }

    return (
        <div className={styles.board__list}>
            <NewItemButton ref={buttonRef} onClick={handleAddClick} color={buttonColor}/>
            {isAddingBoard && (
                <BoardListItem isForm={true} isFormOpen={isAddingBoard} isFormClosing={isClosingForm}>
                    <BoardListItemForm ref={formRef} onAddBoard={addNewBoardItem}/>
                </BoardListItem>
                )}
                {boards
                .sort((a, b) => b.id - a.id)
                .map(board => (
                    <BoardListItem 
                        key={board.id} 
                        title={board.title} 
                        isActive={activeBoardId === board.id}
                        onBoardClick={() => activateBoard(board.id)}
                        onDelete={() => deleteBoard(board.id)}
                        onEdit={(newTitle) => editBoard(board.id, newTitle)}
                    />
            ))}
        </div>
        
    );
}

export default BoardList