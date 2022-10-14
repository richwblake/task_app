import React from 'react';

const Task = ({ name, assigned, priority, due_date }) => {
    const createAssigned = () => {
        let count = 0;
        return assigned.map(user => <span key={count++}><b>{user + ' '}</b></span>);
    };

    return (
        <div>
        <h3>{name}</h3>
        <p>Assigned to: {createAssigned()}</p>
        <p>Due date: {due_date}</p>
        <p><b>Priority level: {priority}</b></p>
        </div>
    );
};

export default Task;
