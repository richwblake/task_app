const { User } = require('../db/migrations/createUsers');
const asyncHandler = require('express-async-handler');
const { hashPassword } = require('../middleware/crypt');

const createUser = asyncHandler(async(req, res) => {

	const foundUser = await User.findOne({ where: { username: req.body.username }});

	console.log(foundUser);
	if (foundUser) {
		res.status(400).json({ message: 'Username already exists' });
		throw new Error('Username already exists');
	}

	const user = User.build({ username: req.body.username, 
		password: await hashPassword(req.body.password) });

	try {
		if (await user.save()) 
			res.status(201).json({ message: 'Account created', user: { username: user.username }})
	} catch (error) {
		res.status(400).json({ message: 'Account creation failed' });
		throw new Error(error);
	}	
});

module.exports = {
	createUser
};
