const user = {
    name: 'wb19',
    password: 'shh'
};

const login = (req, res) => {
    const submittedUser = req.body.username;
    const submittedPass = req.body.password;

    if (req.session.user_id) {
        res.status(200).json({ message: 'Already authenticated' }); 
    } else {
        if (submittedUser === user.name && submittedPass === user.password) {
            req.session.regenerate(err => {
                if (err) next(err);
                req.session.user_id = 19;
                req.session.save(err => {
                    if (err) next(err);
					res.status(201).json({ message: `Welcome back, ${user.name}`, user: { name: user.name } });
                });
            });
        }
        else {
            res.status(401).json({ message: 'Incorrect credentials' });
        }
    } 
};

const check = (req, res) => {
    if (req.session.user_id) 
		res.status(200).json({ message: 'Authenticated', user: { name: user.name } });
};

module.exports = {
    login,
    check
};
