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
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    try {
      const savedBoards = JSON.parse(localStorage.getItem('boards') || '[]')
      setBoards(savedBoards)
    } catch (error) {
      console.error('Error parsing boards from localStorage', error);
      setBoards([]);
      localStorage.setItem('boards', JSON.stringify([]));
    }
  }, []);

  const updateBoards = (updatedBoards) => {
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards))
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header/>
        <LeftPanelBody>
          <BoardList
          boards={boards}
          activeBoardId={activeBoardId}
          setActiveBoardId={setActiveBoardId}
          updateBoards={updateBoards}
          />
        </LeftPanelBody>
      </LeftPanel>
      <KanbanBody>
        <ColumnWrapper
          boards={boards}
          activeBoardId={activeBoardId}
          updateBoards={updateBoards}
        />
      </KanbanBody>

    </div>
  )
}

export default App
