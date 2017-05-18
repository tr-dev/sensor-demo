'use strict';
/*
* Helper class for modifiying sensors stored in the db
*/

const ALL_SENSORS = 'SELECT * FROM sensors'
const SQLHelper = require('./SQLHelper');
class SensorHelper {

  /*
  * Fetches all of the current sensors in the db
  */
  getAllSensors() {
    return new Promise((accept, reject) => {
      let sensors = [];
      let sqlHelper = new SQLHelper();
      sqlHelper.query(ALL_SENSORS)
      .then((data ) => {
        sensors = data;
        return sqlHelper.close()
      }, reject)
      .then(() => {
        accept(sensors)
      }, reject)
      .catch((err) => {
        return reject(err);
      })
    })
  }
  /*
  * Adds a new sensor to the group
  */
  addSensor() {
    return new Promise((accept, reject) => {
      let sensors     = [];
      let sqlHelper   = new SQLHelper();
      sqlHelper.query(`INSERT INTO sensors VALUES("${(new Date()).getTime()}", ${Math.floor(Math.random() * 10000)}, ${Math.floor(Math.random() * 100)}, 120, ${+(Math.random() * 100).toFixed(2)}, null )`)
      .then(() => {
        return sqlHelper.query(ALL_SENSORS);
      }, reject)
      .then((data) => {
        sensors = data;
        return sqlHelper.close();
      }, reject)
      .then(() => {
        accept(sensors);
      }, reject)
    });
  }
  /*
  * Removes a new sensor to the group
  */
  removeSensor(uuid) {
    return new Promise((accept, reject) => {
      let sensors      = [];
      let sqlHelper    = new SQLHelper();
      let removeEventsQuery = `DELETE FROM events WHERE UUID="${uuid}"`;
      let removeSensorQuery = `DELETE FROM sensors WHERE UUID="${uuid}"`;

      sqlHelper.query(removeEventsQuery)
      .then(() => {
        return sqlHelper.query(removeSensorQuery);
      })
      .then(() => {
        return sqlHelper.query(ALL_SENSORS);
      }, reject)
      .then((data) => {
        sensors = data;
        return sqlHelper.close();
      }, reject)
      .then(() => {
        accept(sensors);
      }, reject)
    });
  }
  /*
  * Updates the default value for sensors
  */
  updateSensor(uuid, key, val) {
    return new Promise((accept, reject) => {
      let sensors     = []
      let sqlHelper   = new SQLHelper();
      let currentTime = this.getDateTime();

      /*
      * Updates time default values in db
      */
      let query = `UPDATE sensors SET LAST_PING="${currentTime}" `;
      query += ( key ? `, ${key}=${val} `: "")
      query += `WHERE UUID="${uuid}"`


      sqlHelper.query(query)
      .then(() => {
        return sqlHelper.query(ALL_SENSORS)
      }, reject)
      .then((data) =>{
        sensors = data;
        return sqlHelper.close()
      }, reject)
      .then(() => {
        accept(sensors)
      }, reject)
    })
  }

  /*
  * Adding "event" to sensor table
  */
  addEvent(sensor) {
    return new Promise((accept, reject) => {
      let sqlHelper   = new SQLHelper();
      let sensors     = [];
      let currentTime = this.getDateTime()
      let query = `INSERT INTO events VALUES("${sensor.UUID}", "${currentTime}", ${sensor.TEMP}, ${sensor.VOLTS}, ${sensor.AMPS} )`;

      sqlHelper.query(query)
      .then(() => {
        return this.updateSensor(sensor.UUID);
      }, reject)
      .then(() => {
        return sqlHelper.query(ALL_SENSORS);
      })
      .then((data) => {
        sensors = data;
        return sqlHelper.close();
      }, reject)
      .then(() => {
        return accept(sensors);
      }, reject);

    });
  }
  getGraphData(uuid, interval) {
    return new Promise((accept, reject) => {
      let sqlHelper   = new SQLHelper();
      let sensors     = [];
      let currentTime = this.getDateTime()
      let results     = [];
      let query       = `SELECT * from events where timestamp > (NOW() - interval ${interval} MINUTE) AND UUID=${uuid}`

      sqlHelper.query(query)
      .then((data) => {
        results = data;
        return sqlHelper.close();
      }, reject)
      .then(() => {
        return accept(results) ;
      }, reject);

    });
  }


  getDateTime() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}
module.exports = SensorHelper
