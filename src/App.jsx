import 'normalize.css';
import './App.css'
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

function App() {
  const buttonColors = ["#8646c1", "#908799", "#E79690", "#74B97C"] //interafsce&backlog, to-do, in-progress, completed
  const columnTitles = ['Нет статуса', 'Запланировано', 'В процессе', 'Завершено']
  const columnClasses = ['backlog','todo', 'progress', 'completed'];

  const cards = [
    {
      task: 'Задача 1',
      deadline: 'до 12.06.2025',
    },
    {
      task: 'Задача 2',
      deadline: 'до 24.07.2025',
    },
    {
      task: 'Задача 3',
      deadline: 'без срока',
    },
  ]

  return (
    <div className="app">
      <LeftPanel>
        <Header/>
        <LeftPanelBody>
          <NewItemButton color={buttonColors[0]}/>
          <BoardList>
            <BoardListItem title='Доска 1'/>
            <BoardListItem title='Доска 2'/>
            <BoardListItem title='Доска 3'/>
          </BoardList>
        </LeftPanelBody>
      </LeftPanel>
      <KanbanBody>
        <ColumnWrapper>
            <Column title={columnTitles[0]} color={columnClasses[0]} >
              <TaskCard task={cards[2].task} deadline={cards[2].deadline}/>
              <NewItemButton color={buttonColors[0]}/>
            </Column>
            <Column title={columnTitles[1]} color={columnClasses[1]} >
              <TaskCard task={cards[0].task} deadline={cards[0].deadline}/>
              <TaskCard task={cards[1].task} deadline={cards[1].deadline}/>
              <TaskCard task={cards[2].task} deadline={cards[2].deadline}/>
              <NewItemButton color={buttonColors[1]}/>
            </Column>
            <Column title={columnTitles[2]} color={columnClasses[2]} >
              <TaskCard task={cards[0].task} deadline={cards[0].deadline}/>
              <TaskCard task={cards[1].task} deadline={cards[1].deadline}/>
              <TaskCard task={cards[2].task} deadline={cards[2].deadline}/>
              <NewItemButton color={buttonColors[2]}/>
            </Column>
            <Column title={columnTitles[3]} color={columnClasses[3]} >
              <TaskCard task={cards[0].task} deadline={cards[0].deadline}/>
              <TaskCard task={cards[1].task} deadline={cards[1].deadline}/>
              <TaskCard task={cards[2].task} deadline={cards[2].deadline}/>
              <NewItemButton color={buttonColors[3]}/>
            </Column>
        </ColumnWrapper>
      </KanbanBody>

    </div>
  )
}

export default App
