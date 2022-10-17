import React, { useState } from 'react';

const LoginForm = ({ handleSubmit }) => {

	const [formController, setFormController] = useState({ username: '', password: '' });

	const handleChange = e => {
		setFormController({ ...formController, [e.target.name]: e.target.value })
	};

	const handleLocalSubmit = e => {
		e.preventDefault();
		handleSubmit(formController);
	};

	return (
		<div id='form-container'>
			<h2>Please log in to access tasks</h2>
			<form id='login-form' onSubmit={handleLocalSubmit}>
				<label>
					Name:   
					<input type='text' name='username' value={formController.username} onChange={handleChange} />
				</label>
				<br />
				<br />
				<label>
					Password:
					<input type='text' name='password' value={formController.password} onChange={handleChange} />
				</label>
				<br />
				<br />
				<input type="submit" value="Log In" />
			</form>
		</div>
	);
};

export default LoginForm;
