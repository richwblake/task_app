const { Sequelize } = require('sequelize');

const DEV_DB = {
	path: './db/dev.sqlite',
	name: 'dev.sqlite'
};

const sequelize = new Sequelize({ 
	dialect: 'sqlite',
	storage: DEV_DB.path
});

const connect = async () => {
	try {
		await sequelize.authenticate();
		console.log(`Connecting to ${DEV_DB.name}...`);
		console.log(`Connection to ${DEV_DB.name} successful!`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = { connect, sequelize };
