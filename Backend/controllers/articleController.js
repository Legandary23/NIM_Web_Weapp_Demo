const articleController = {};

articleController.get = (req, res) => {
    const { article_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM articles WHERE idarticles = ?', [article_id], (err, data) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(data);
        });
    });
};

articleController.add = (req, res) => {
    console.log(req.body);
    const group_id = req.body.group_id;
    const metadata = JSON.stringify(req.body.metadata);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO articles (idarticles, idgroup, metadata) VALUES (NULL, ?, ?)', [group_id, metadata], (err, article) => {
            console.log(err);
            res.end("entry inserted");
        })
    })
};

module.exports = articleController;