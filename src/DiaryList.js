import DiaryItem from "./DiaryItem.js";
import React, {useContext} from "react";
import { DiaryStateContext } from "./App.js";

const DiaryList = () => {

    const data = useContext(DiaryStateContext);

    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{data.length}개의 일기가 있습니다.</h4>
        <div>
            {data.map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    </div>
    );
};



export default React.memo(DiaryList);


