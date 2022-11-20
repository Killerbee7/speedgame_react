import React from 'react';

function Modal(props) {
    return (
        <div className="modal">
            <div className='score'>
            <button className='close' type='close' onClick={props.close}>X</button>
            <h1>Game Over</h1>
            <p> <span>{props.message}</span></p>
            </div>
            
        </div>
    );
}

export default Modal;

