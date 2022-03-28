import DiaryWriter from './DiaryWriter';

import './App.css';
import DiaryList from './DiaryList'
import { useState, useRef, useEffect } from 'react';


function App() {
  const [data, setData] = useState([])
  const idRef = useRef(0)
  const createData = (author, content, feelNumber) => {
    const created_date = new Date().getTime();
    const newData = {
      id: idRef.current,
      author: author,
      content: content,
      feelNumber: feelNumber,
      created_date: created_date,
    };
    idRef.current += 1;
    setData([newData, ...data]);
  }

  const getData = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res)=>
    res.json());

    const initData = res.map((it) => {
      return({
        author: it.email,
        content: it.body,
        created_date: new Date().getTime(),
        feelNumber: Math.floor(Math.random() * 5) + 1,
        id: idRef.current++
      });
    });

    setData(initData);
  }

  useEffect(()=>{
    getData();
  },[])

  const removeData = (targetId) => {
    const newDiaryData = data.filter((it)=> it.id !== targetId);
    setData(newDiaryData);
  }

  const editData = (targetId, newContent) => {
    setData(data.map((it) => it.id === targetId ? {...it, content:newContent}:it));
  }

  return (
    <div className="App">
      <DiaryWriter createData={createData} />
      <DiaryList diaryList={data} removeData={removeData} editData={editData}/>
      
    </div>
  );
}

export default App;
