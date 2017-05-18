'use strict';
var SensorHelper = new (require('./helpers/SensorHelper'))();
/*
* Sockets related items go here
*/
module.exports = (app, io) => {
  io.on('connection', (socket) => {

    /*
    * When the app is being added to the dom
    */
    socket.on('startup', () => {

      SensorHelper.getAllSensors()
      .then((sensors) => {
        io.emit('updateSensorList', sensors)
      }, (error) => {
        io.emit('sensorError', `Error fetching sensors: ${errorHelper(error)}`)
      });
    });

    /*
    * Sensor is checking in
    */
    socket.on('sensorPing', (uuid, data) => {
      let sensor;
      SensorHelper.getAllSensors()
      .then((sensors) => {
        let match = (sensors || []).findIndex((sensor) => {
          return sensor.UUID === uuid;
        });

        return match > -1 ? SensorHelper.addEvent(sensors[match]) : Promise.resolve(sensors);
      },(error) => {
        io.emit('sensorError', `Error fetching sensors: ${errorHelper(error)}`)
      })
      .then((sensors) => {
        io.emit('updateSensorList', sensors);
      }, (error) => {
        io.emit('sensorError', `Error adding event for ${uuid}: ${errorHelper(error)}`)
      });
    });

    /*
    * Removes a sensor from the db
    */
    socket.on('removeSensor', (uuid) => {
      SensorHelper.removeSensor(uuid)
      .then((sensors) => {
        io.emit('updateSensorList', sensors);
      }, (error) => {
        io.emit('sensorError', `Error removing ${uuid}: ${errorHelper(error)}`)
      })
    });
    /*
    /*
    * TODO - Add ability to take data to make custom sensor
    */
    socket.on('addSensor', () => {
      SensorHelper.addSensor()
      .then((sensors) =>{
        io.emit('updateSensorList', sensors);
      }, ( error ) => {
        io.emit('sensorError', `Error adding sensor: ${errorHelper(error)}`)
      });
    });

    /*
    * Sensor gets updated default values. They need to be updated in the db
    */
    socket.on('updateSensor', (data) => {
      let { uuid, key, val} = data;
      SensorHelper.updateSensor(uuid, key, val)
      .then((sensors) => {
        io.emit('updateSensorList', sensors);
      }, ( error ) => {
        io.emit('sensorError', `Error updating ${uuid}: ${errorHelper(error)}`);
      });
    });

    /*
    * Requesting the last {interval} minutes of data
    */
    socket.on('newGraphData', (uuid, interval) => {
      SensorHelper.getGraphData(uuid, interval)
      .then((results) => {
        socket.emit(`graphData_${uuid}`, results)
      }, ( error ) => {
        io.emit('sensorError', `Error getting graph data for ${uuid}: ${errorHelper(error)}`);
      });
    });
  });
}

function errorHelper(error) {
  let message = "";
  switch (error.errno) {
    case 'ECONNREFUSED':
      message = `Can not connect to ${error.address}:${error.port}`;
      break;
    case 'ER_BAD_FIELD_ERROR' :
      message = `Invalid field being updated`;
    break;
    default:
      console.log(error)
      message = `Error: ${error.errno}`;
      break;
  }
  return message;
}
