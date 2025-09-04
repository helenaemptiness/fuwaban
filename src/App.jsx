import 'normalize.css';
import './App.css'
import { useState, useEffect } from 'react';

import LeftPanel from './layouts/LeftPanel/LeftPanel';
import KanbanBody from './layouts/KanbanBody/KanbanBody';
import Header from './components/Header/Header';
import LeftPanelBody from './components/LeftPanelBody/LeftPanelBody';
import NewItemButton from './components/NewItemButton/NewItemButton';
import BoardList from './components/BoardList/BoardList';
import BoardListItem from './components/BoardListItem/BoardListItem';
import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper';
import Column from './components/Column/Column';
import TaskCard from './components/TaskCard/TaskCard';
import BoardListItemForm from './components/BoardListItemForm/BoardListItemForm';
import TaskCardForm from './components/TaskCardForm/TaskCardForm';



function App() {
  const buttonColors = ["#8646c1", "#908799", "#E79690", "#74B97C"] //interafsce&backlog, to-do, in-progress, completed
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false)
  

  const openTaskForm = (columnId) => {
    setActiveColumnId(columnId);
    setIsAddingTask(true);
  };

  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState(null);
  
  const openBoardItemForm = () => {
    setIsAddingBoard(true);
  };

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    setBoards(savedBoards);
  }, [])

  const addNewBoardItem = (newBoard) => {
    setBoards(existingBoards => [...existingBoards, newBoard]);
    setActiveBoardId(newBoard.id)
    setIsAddingBoard(false)
  };

  const activateBoard = (boardId) => {
    if (isAddingBoard) {
      setIsAddingBoard(false)
    }
    setActiveBoardId(boardId);
  }

  const addTaskToColumn = (columnId, newTask) => {
    setBoards(existingBoards => {
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
    <div className="app">
      <LeftPanel>
        <Header/>
        <LeftPanelBody>
          <NewItemButton onClick={openBoardItemForm} color={buttonColors[0]}/>
          <BoardList>
            {isAddingBoard && (
              <BoardListItem isForm={true}>
                <BoardListItemForm onAddBoard={addNewBoardItem}/>
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
                  />
            ))}
            
          </BoardList>
        </LeftPanelBody>
      </LeftPanel>
      <KanbanBody>
        <ColumnWrapper>
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
                          setIsFormTask(false)
                        }}>
                            <TaskCardForm 
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
                        />
                      ))}
                      
                    </Column>
                  ))
            ))}
        </ColumnWrapper>
      </KanbanBody>

    </div>
  )
}

export default App
