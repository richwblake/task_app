import { useState, useEffect } from 'react';
import Task from '../components/Task';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const URL = 'http://localhost:3000';
	const [user, setUser] = useState({ name: '' });
	const [tasks, setTasks] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		check(); 
	}, []);

	const check = async () => {
		try {
			const response = await fetch(URL + '/api/check', { credentials: 'include' });
			const json = await response.json();

			if (json.user) {
				setUserAndFetchTasks(json.user);
			}

			if (response.status === 401) {
				toast(json.message);
			}
		} catch (error) {
			console.error(error);
		}
	};
	const setUserAndFetchTasks = user => {
		setLoggedIn(true);
		setUser(user);
		fetchTasks();
	};

	const fetchTasks = async () => {
		try {
			const response = await fetch(URL + '/api/tasks', { credentials: 'include' });
			const json = await response.json();
			setTasks(json.tasks);
		}
		catch (error) {
			console.log(error);
		}
	};

	const renderTasks = () => {
		return tasks.map(task => <Task key={task.name} name={task.name} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />)
	};


	const handleSubmit = userInfo => {
		postLogin(userInfo);
	};

	const handleInputChange = e => {
		setFormController({...formController, [e.target.name]: e.target.value }); 
	};

	const postLogin = async userInfo => {
		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json'
			},
			credentials: 'include',
			body: JSON.stringify(userInfo)
		};

		try {
			const response = await fetch(URL + '/api/login', config);
			const json = await response.json();

			if (response.status === 201) {
				toast(json.message);
				setUserAndFetchTasks(json.user);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const renderUI = () => {
		if (loggedIn) {
			return (
				<div>
					<h1>Welcome {user.name}!</h1>
					<h3>Here are your assigned tasks</h3>
					{renderTasks()}
				</div>
			)
		} else {
			return (
				<div>
					<LoginForm handleSubmit={handleSubmit} />
				</div>
			)
		}	
	};

	return (
		<div className="">
			<ToastContainer />
			<Header />
			{renderUI()}	
		</div>
	)
}

export default App
