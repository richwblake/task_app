const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../connect');

const Task = sequelize.define('Task', {
	// Attributes defined here
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	assigned_to: {
		type: DataTypes.STRING,
		allowNull: false
	},
	due_date: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

const syncTasks = async () => {
	await Task.sync({ force: true });
};

syncTasks();

module.exports = {
	Task
};

