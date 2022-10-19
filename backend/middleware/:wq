const bcrypt = require('bcryptjs');

const hashPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const checkPassword = async (...args) => {
	return await bcrypt.compare(...args);
};

module.exports = {
	hashPassword,
	checkPassword
};
