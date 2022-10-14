const fs = require('node:fs/promises');
const FILE_NAME = 'log.txt';

const logToConsole = (req, res, next) => {
    const type = req.method;
    const target = req.url;
    const ip = req.ip;
    const user_id = req.session.user_id;
    const origin = req.headers['user-agent'];

    let authStr =  'User is';
    const reqStr =  `Request type: [${type}]`;
    const endptStr = `Endpoint - ${target}`
    const originStr = `Client device: [${origin}]`;
    const ipStr = `Device IP: [${req.ip}]`
    const session = req.session;

    if (user_id)
        authStr += ` authenticated - id: ${req.session.user_id}`;
    else
        authStr += ' unauthenticated';

    console.log(`--------- REQUEST ON ${formatLocalDate()} ---------`);
    console.log(authStr);
    console.log(reqStr);
    console.log(endptStr);
    console.log(originStr);
    console.log(ipStr);
    console.log(`Current session:\n`, session);
    console.log(`--------- REQUEST END ---------`);

    writeToFile(req);

    next();
};

const formatLocalDate = () => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        timeStyle: 'medium',
        day: 'numeric'
    };  


    const event = new Date();
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' }).format(event);
};

const writeToFile = async req => {
    const type = req.method;
    const target = req.url;
    const ip = req.ip;

    const formatted = `Request type: [${type}] / ${target} Originating from [${ip}]\n`; 

    try {
        await fs.appendFile('./middleware/' + FILE_NAME, formatted);
    } catch (error) {
        console.log("Error writing request to file: TRACE", error);
    }
};

module.exports = {
    log: logToConsole
};
