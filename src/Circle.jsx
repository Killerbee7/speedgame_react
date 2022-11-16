import React from 'react';

const Circle = (props) => {
    return (
        <div className='circle_container'>
            <div className={`click ${props.active ? "active" : "" }`} 
            onClick={props.click}
            style={{pointerEvents: props.activeEvent ? "all" : "none"}}
            >
                <p>{props.id}</p>
                </div>

        </div>
    );
};

export default Circle;