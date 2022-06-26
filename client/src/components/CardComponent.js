import React from 'react';
import deleteImage from '../assets/images/delete.png';

function CardComponent(props) {
    return (
        <div className="card">
            <h3>{props.title}: "{props.message}"</h3>
            <input className="edit-input" type="text" onChange={props.changeTitle}/>
            <button className="btn" onClick={props.updateTitle}>update title</button>
            <input className="edit-input" type="text" onChange={props.changeMessage}/>
            <button className="btn" onClick={props.updateMessage}>update message</button>
            <div className="delete-send-buttons">
                <button className="btn delete" onClick={props.delete}>
                    <img src={deleteImage} alt="delete" width="20px"></img>
                </button>
                <button onClick={props.send} className='btn send'>Send</button>
            </div>
            <span>Type: <span className="type">{props.type}</span></span>
            <span>Created at: <span className="created-at">{props.createdAt}</span></span>
        </div>
        
    )
}

export default CardComponent;