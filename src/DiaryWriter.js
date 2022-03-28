import React, { useState, useRef } from "react";

const DiaryWriter = ({createData}) =>{
    
    const [state, setState] = useState({
        author: "",
        content: "",
        feelNumber: 1,
    });

    const authorRef = useRef()
    const contentRef = useRef()

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleButtonClick = () => {
        if(state.author.length < 1){
            authorRef.current.focus();
            return;
        }
        if(state.content.length < 5){
            contentRef.current.focus();
            return;
        }
        alert("일기 저장 성공");
        createData(state.author, state.content, state.feelNumber);
        setState({
            author: "",
            content: "",
            feelNumber: 1,
        });
    }

    return (
        <div className="DiaryWriter">
            <div>
                <input ref={authorRef} name="author" value={state.author} onChange={handleChangeState} />
            </div>
            <div>
                <textarea ref={contentRef} name="content" value={state.content} onChange={handleChangeState} />
            </div>
            <div>
                <select name="feelNumber" value={state.feelNumber} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleButtonClick}>일기저장하기</button>
            </div>
        </div>
    )
};

export default React.memo(DiaryWriter);