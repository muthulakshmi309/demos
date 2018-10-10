    var mysql = require('mysql');
    
    // Connect to mySQL database
    global.createDbConn = function createMySqlConnection() {
        return mysql.createConnection({
            host: '192.168.1.30',
            user: 'dbadmin',
            password: 'ca1490c58c',
            database: 'keplercms_debug'
        });
    }

    module.exports = {
        getVendor: (req, res) => {
            var conn = global.createDbConn();
            conn.connect();
            conn.query('SELECT * FROM tblvendor', function (err, rows, fields) {
                conn.end();

                if (err) {
                    res.status(403).send(err);
                } else {
                    res.status(200).json(rows);
                }
            })
        },

        getScenario: (req, res) => {
            var conn = global.createDbConn();
            conn.connect();
            conn.query('call uspSelectScenarioForBuildVersionName("' + req.params.batchName + '")', function (err, rows, fields) {
                conn.end();

                if (err) {
                    res.status(403).send(err);
                } else {
                    res.status(200).json(rows[2][0]);
                }
            })
        }
    };