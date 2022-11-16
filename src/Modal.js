import React from 'react';

function Modal(props) {
    return (
        <div className="modal">
            <button type='close' onClick={props.close}>X</button>
            <h1>Game Over</h1>
            <p>Your Score is : <span>{props.score}</span></p>
            
        </div>
    );
}

export default Modal;

