import { useState } from 'react';
import styles from './ColumnWrapper.module.css';
import Column from '../Column/Column';
import TaskCard from '../TaskCard/TaskCard';
import TaskCardForm from '../TaskCardForm/TaskCardForm';
import NewItemButton from '../NewItemButton/NewItemButton';

function ColumnWrapper({ boards, activeBoardId, updateBoards }) {
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false)
    
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]
    const localToday = today.toLocaleDateString('ru-RU')

    const openTaskForm = (columnId) => {
        setTimeout(() => {
            setActiveColumnId(columnId);
            setIsAddingTask(true);
        }, 200);
        
    };

    const addTaskToColumn = (columnId, newTask) => {
        updateBoards(existingBoards => {
            const updatedBoards = existingBoards.map(board => {
                if (board.id === activeBoardId) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                        if (column.id === columnId) {
                            return {
                            ...column,
                            tasks: [...column.tasks, newTask]
                            };
                        }
                        return column;
                        })
                    };
                }
                return board;
            });
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            return updatedBoards;
        });
    };
    return (
        <div className={styles.wrapper}>
            {boards
                .filter(board => board.id === activeBoardId)
                .map(board => (
                    board.columns.map(column => (
                        <Column 
                        key={column.id}
                        title={column.title}
                        type={column.type}
                        tasks={column.tasks}
                        color={column.type}
                        >
                        <NewItemButton color={column.color} onClick={() => openTaskForm(column.id)}/>
                        {isAddingTask && activeColumnId === column.id && (
                            <TaskCard 
                            isFormTask={true}
                            onClose={() => {
                            setIsAddingTask(false)

                            }}>
                                <TaskCardForm 
                                    minDate={formattedToday}
                                    onClose={() => setIsAddingTask(false)}
                                    onSubmit={(taskData) => addTaskToColumn(column.id, taskData)}
                                />
                            </TaskCard>
                        )}
                        {column.tasks
                        .sort((a, b) => b.id - a.id)
                        .map(task => (
                            <TaskCard 
                            key={task.id}
                            task={task.text}
                            deadline={task.deadline}
                            isAddingTask={isAddingTask}
                            currentDate={localToday}
                            />
                        ))}
                        
                        </Column>
                        
                    ))
                ))}
        </div>
    );
}

export default ColumnWrapper