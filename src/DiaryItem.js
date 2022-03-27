
const DiaryItem = ({id, author, content, fellNumber, created_date}) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span className="author_info">|작성자: {author} | 감정점수: {fellNumber}</span>
                <br />
                <span className="date">{new Date(created_date).toLocaleDateString()}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

export default DiaryItem