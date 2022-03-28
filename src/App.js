import DiaryWriter from './DiaryWriter';

import './App.css';
import DiaryList from './DiaryList'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';


function App() {
  const [data, setData] = useState([])
  const idRef = useRef(0)
  const createData = useCallback((author, content, feelNumber) => {
    const created_date = new Date().getTime();
    const newData = {
      id: idRef.current,
      author: author,
      content: content,
      feelNumber: feelNumber,
      created_date: created_date,
    };
    idRef.current += 1;
    setData((data) => [newData, ...data]);
  }, [])

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

  const diaryAnalisys = useMemo(() => {
    const goodCount = data.filter((it)=> it.feelNumber >= 3).length;
    const badCount = data.filter((it) => it.feelNumber < 3).length;
    const goodRatio = (goodCount /data.length) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = diaryAnalisys;

  const removeData = useCallback((targetId) => {
    setData((data) => data.filter((it)=> it.id !== targetId));
  }, []);

  const editData = useCallback((targetId, newContent) => {
    setData((data) => data.map((it) => it.id === targetId ? {...it, content:newContent}:it));
  }, []);

  return (
    <div className="App">
      <DiaryWriter createData={createData} />
      <div>{goodCount}</div>
      <div>{badCount}</div>
      <div>{goodRatio}</div>
      <DiaryList diaryList={data} removeData={removeData} editData={editData}/>
      
    </div>
  );
}

export default App;
