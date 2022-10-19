const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../connect');

const User = sequelize.define('User', {
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

const syncTasks = async () => {
	await User.sync({ force: true });
};

syncTasks();

module.exports = {
	User
};
