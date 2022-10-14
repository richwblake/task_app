import { useState, useEffect } from 'react';
import Task from './Task';

function App() {
    const URL = 'http://localhost:3000';
    const [user, setUser] = useState({ uname: '', pass: '' });
    const [tasks, setTasks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        check(); 
    }, []);

    const check = () => {
        fetch(URL + '/api/check', { credentials: 'include' })
            .then(handleResponse)
            .catch(console.error);
    };

    const handleResponse = async response => {
        if (response.status === 200 || response.status === 201) {
            setLoggedIn(true);
            fetchTasks();
        } else if (response.status === 401) {
            const err = await response.json();
        }
    };

    const fetchTasks = () => {
        fetch(URL + '/api/tasks', { credentials: 'include' })
            .then(res => res.json())
            .then(json => setTasks(json.tasks))
            .catch(console.error);
    };

    const renderTasks = () => {
        return tasks.map(task => <Task key={task.name} name={task.name} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />)
    };


    const handleSubmit = e => {
        e.preventDefault();
        postLogin(user);
    };

    const handleInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value }) 
    };

    const postLogin = user => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        };

        fetch(URL + '/api/login', config)
            .then(res => {
                handleResponse(res)
            })
            .catch(console.error);
    };


    const renderPage = () => {
        if (loggedIn) {
            return (
                <div>
                    <h1>Welcome valued user!</h1>
                    <h3>Here are your assigned tasks</h3>
                    {renderTasks()}
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Please log in</h1>
                    <form id='form' onSubmit={handleSubmit}>
                        <input name='uname' value={user.uname} onChange={handleInputChange} />
                        <input name='pass' value={user.pass} onChange={handleInputChange} />
                        <button type='submit'>Log in</button>
                    </form>
                </div>
            )
        }
    };

    return (
        <div className="App">
            {renderPage()} 
        </div>
    )
}

export default App
