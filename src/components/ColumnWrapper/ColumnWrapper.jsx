import { useState } from 'react';
import styles from './ColumnWrapper.module.css';
import Column from '../Column/Column';
import TaskCard from '../TaskCard/TaskCard';
import TaskCardForm from '../TaskCardForm/TaskCardForm';
import NewItemButton from '../NewItemButton/NewItemButton';

function ColumnWrapper({ boards, activeBoardId, updateBoards }) {
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);

    const today = new Date()
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedToday = today.toISOString().split('T')[0]

    const openTaskForm = (columnId) => {
        setTimeout(() => {
            setActiveColumnId(columnId);
            setIsAddingTask(true);
        }, 200);
        
    };

    const startEditingTask = (taskId) => {
        setEditingTaskId(taskId);
    };

    const cancelEditingTask = () => {
        setEditingTaskId(null);
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

    const updateTaskInColumn = (columnId, taskId, updatedTask) => {
        updateBoards(existingBoards => {
            const updatedBoards = existingBoards.map(board => {
                if (board.id === activeBoardId) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            if (column.id === columnId) {
                                return {
                                    ...column,
                                    tasks: column.tasks.map(task => 
                                        task.id === taskId 
                                            ? { ...task, ...updatedTask }
                                            : task
                                    )
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

        setEditingTaskId(null);
    };

    const deleteTask = (columnId, taskId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            return;
        }
        

    updateBoards(existingBoards => {
            const updatedBoards = existingBoards.map(board => {
                if (board.id === activeBoardId) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            if (column.id === columnId) {
                                return {
                                    ...column,
                                    tasks: column.tasks.filter(task => task.id !== taskId)
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

    const handleDragEnd = () => {
        setDragOverColumn(null);
    };

    const handleColumnDragOver = (columnId, e) => {
        e.preventDefault()
        setDragOverColumn(columnId);
    };

    const handleColumnDrop = (toColumnId, e) => {
        e.preventDefault();

        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const {taskId, fromColumnId, task} = data;

        if (fromColumnId === toColumnId) {
            setDragOverColumn(null);
            console.log('current to current');
            return;
        }

        updateBoards(existingBoards => {
            const updatedBoards = existingBoards.map(board => {
                if (board.id === activeBoardId) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            if (column.id === fromColumnId) {
                                return {
                                    ...column,
                                    tasks: column.tasks.filter(t => t.id !== taskId)
                                };
                            } else if (column.id === toColumnId) {
                                return {
                                    ...column,
                                    tasks: [...column.tasks, task]
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
        setDragOverColumn(null);
    }
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
                        onDragOver={(e) => handleColumnDragOver(column.id, e)}
                        onDrop={(e) => handleColumnDrop(column.id, e)}
                        isOver={dragOverColumn === column.id}
                        >
                        <NewItemButton color={column.color} onClick={() => openTaskForm(column.id)}/>
                        {isAddingTask && activeColumnId === column.id && (
                            <TaskCard 
                            isFormTask={true}
                            onClose={() => {
                            setIsAddingTask(false)

                            }}>
                                <TaskCardForm 
                                    formType={'addTask'}
                                    minDate={formattedToday}
                                    onClose={() => setIsAddingTask(false)}
                                    onSubmit={(taskData) => addTaskToColumn(column.id, taskData)}
                                />
                            </TaskCard>
                        )}
                        {column.tasks.map(task => (
                            <TaskCard 
                                key={task.id}
                                task={task.text}
                                deadline={task.deadline}
                                isAddingTask={isAddingTask}
                                isEditingTask={editingTaskId === task.id}
                                isMoving={editingTaskId !== null && editingTaskId !== task.id}
                                currentDate={todayDate}
                                onEdit={(editedTask) => updateTaskInColumn(column.id, task.id, editedTask)}
                                onEditClick={() => startEditingTask(task.id)}
                                onEditCancel={cancelEditingTask}
                                onDeleteClick={() => deleteTask(column.id, task.id)}
                                onDragEnd={handleDragEnd}
                                taskId={task.id}
                                columnId={column.id}
                            />
                        ))}
                        
                        </Column>
                        
                    ))
                ))}
        </div>
    );
}

export default ColumnWrapper