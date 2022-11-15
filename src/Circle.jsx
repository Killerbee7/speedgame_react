import React from 'react';

const Circle = (props) => {
    return (
        <div className='circle_container'>
            <div className={`click ${props.active ? "active" : "" }`} 
            onClick={props.click}>
                <p>{props.id}</p>
                </div>

        </div>
    );
};

export default Circle;