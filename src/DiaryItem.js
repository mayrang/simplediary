import { useState } from "react";

const DiaryItem = ({id, author, content, feelNumber, created_date, removeData, editData}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newData, setNewData] = useState(content);
    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }
    const handleRemoveClick = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            alert("삭제되었습니다.");
            removeData(id);
        }
        return;
    }
    const handleChange = (e) => {
        setNewData(e.target.value);
    }
    const handleEditClick = () => {
        if(window.confirm("수정하시겠습니까?")){
            alert("수정되었습니다.");
            setIsEdit(!isEdit);
            editData(id, newData);
        }
        
    }
    const handleIsEditCancel = () => {
        setNewData(content);
        setIsEdit(!isEdit);
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span className="author_info">|작성자: {author} | 감정점수: {feelNumber}</span>
                <br />
                <span className="date">{new Date(created_date).toLocaleDateString()}</span>
            </div>
            {isEdit ? (
                <textarea value={newData} onChange={handleChange} />
                ) : (
                <div className="content">{content}</div>
            )}
            {isEdit ? 
            (<div>
                <button onClick={handleEditClick}>저장하기</button>
                <button onClick={handleIsEdit}>수정취소</button>
            </div>)
            :
            (<div>
                <button onClick={handleRemoveClick}>삭제하기</button>
                <button onClick={handleIsEditCancel}>수정하기</button>
            </div>)}
            
        </div>
    )
}

export default DiaryItem