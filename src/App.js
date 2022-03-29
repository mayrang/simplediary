import DiaryWriter from './DiaryWriter';

import './App.css';
import DiaryList from './DiaryList'
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';


const reducer = (state, action) =>{
  switch(action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return (
      [action.data, ...state]
      );
    case "REMOVE":
      return (
        state.filter((it) => it.id !== action.targetId)
      );
    case "EDIT":
      return (
        state.map((it)=> it.id === action.targetId ? {...it, content:action.newcontent} : it)
      )
    default:
      return console.log(state);
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
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
    dispatch({type:"CREATE", data:newData});
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
    dispatch({type:"INIT", data: initData})
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
    dispatch({type:"REMOVE", targetId});
  }, []);

  const editData = useCallback((targetId, newContent) => {
    dispatch({type:"EDIT", targetId, newContent});
  }, []);

  const memorizeDispatch = useMemo(()=> {
    return {createData, removeData, editData};
  }, []);
  

  
  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memorizeDispatch}>
          <DiaryWriter />
          <div>{goodCount}</div>
          <div>{badCount}</div>
          <div>{goodRatio}</div>
          <DiaryList />
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
      
    </div>
  );
}

export default App;

