import DiaryWriter from './DiaryWriter';

import './App.css';
import DiaryList from './DiaryList'

const dummyList = [
  {id: 1,
   author: "박건상",
   content: "일기1",
   fellNumber: 3,
   created_date: new Date().getTime() },
  {id: 2,
   author: "아무개",
   content: "일기1",
   fellNumber: 1,
   created_date: new Date().getTime()},
  {id: 3,
   author: "아무아무개",
   content: "일기2",
   fellNumber: 4,
   created_date: new Date().getTime()},
]

function App() {
  return (
    <div className="App">
      <DiaryWriter />
      <DiaryList diaryList={dummyList} />
      
    </div>
  );
}

export default App;
