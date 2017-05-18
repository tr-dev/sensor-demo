const mysql = require('mysql')

/*
* Wrapper class for mysql so I can chain promises
* https://github.com/mysqljs/mysql#introduction
* Security Plus: Automatically sanitizes inputs :D https://github.com/mysqljs/mysql#escaping-query-values
*/
module.exports = class SQLHelper{
  constructor() {
    /*
    * Don't ever do this on production
    */
    this.config = {
      user     : 'root',
      password : 'password',
      database : 'SENSOR_DEMO'
    }

    /*
    * Creates new connection
    */
    this.connection = mysql.createConnection(this.config);
  }

  /*
  * Adds a new sensor to the group
  */
  connect() {
    return new Promise((accept, reject) => {
      this.connection.connect((err) => {

        return err ? reject(err) : accept();
      });
    });
  }

  close() {
    return new Promise((accept, reject) => {
      this.connection.end((err) => {
        return err ? reject(err) : accept();
      });
    });
  }
  query(query) {
    return new Promise((accept, reject) => {
      this.connection.query(query, (err, results, fields) => {
        return err ? reject(err) : accept(results);
      })
    })
  }

}
