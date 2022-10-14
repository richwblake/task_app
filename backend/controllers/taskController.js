const getTasks = (req, res) => {
    const t1 = {
        name: 'Set up simple static site with React.js',
        priority: 3,
        assigned: ['wb19'],
        due_date: '10/16/22'
    };
    const t2 = {
        name: 'Curriculum draft: Introductory Javascript',
        priority: 3,
        assigned: ['meva'],
        due_date: '10/16/22'
    };
    const t3 = {
        name: 'Meet together for styling design conversation',
        priority: 3,
        assigned: ['meva', 'wb19'],
        due_date: '10/14/22'
    };

    const tasks = [t1, t2, t3];

    res.status(200).json({ tasks });
};

module.exports = {
    getTasks
};
