const articleController = {};

articleController.get = (req, res) => {
    const { article_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT article_id FROM articles WHERE article_id = ?', [article_id], (err, data) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(data);
        });
    });
};

articleController.add = (req, res) => {
    const article_data = req.body;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO articles set ?', [article_data], (err, user) => {
            console.log(user);
            res.redirect('/');
        })
    })
};

module.exports = articleController;