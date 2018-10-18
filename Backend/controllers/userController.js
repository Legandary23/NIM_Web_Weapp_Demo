const controller = {};

controller.get = (req, res) => {
    const { wechat_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT yunxin_id FROM users WHERE wechat_id = ?', [wechat_id], (err, data) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(data);
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users set ?', [data], (err, user) => {
            console.log(user);
            res.redirect('/');
        })
    })
};

// controller.edit = (req, res) => {
//     const { id } = req.params;
//     req.getConnection((err, conn) => {
//         conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
//             res.render('customers_edit', {
//                 data: rows[0]
//             })
//         });
//     });
// };

// controller.update = (req, res) => {
//     const { id } = req.params;
//     const newCustomer = req.body;
//     req.getConnection((err, conn) => {
//
//         conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
//             res.redirect('/');
//         });
//     });
// };

// controller.delete = (req, res) => {
//     const { id } = req.params;
//     req.getConnection((err, connection) => {
//         connection.query('DELETE FROM users WHERE wechat_id = ?', [id], (err, rows) => {
//             res.redirect('/');
//         });
//     });
// };

module.exports = controller;