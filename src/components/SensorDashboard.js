import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sensor from './Sensor';

class SensorDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors : [],
      error : ""
    }

    this.props.socket.on('updateSensorList', (sensors) => {
      this.setState(() => {
        return { sensors };
      })
    })

    this.props.socket.on('sensorError', (error) => {
      
      this.setState(() => {
        return { error : error || 'Error' }
      })
    })
  }

  addSensor() {
    this.props.socket.emit('addSensor');
  }
  componentWillMount(){
    this.props.socket.emit('startup');

  }
  render(){
    let SensorList = (this.state.sensors || []).map((sensor) => {
      let props = { socket : this.props.socket, key : sensor.UUID, ...sensor}
      return <Sensor {...props}/>;
    });

    return (
      <div id="app">
        <h1>Dashboard</h1>
        <div className="bg-danger"><p>{this.state.error}</p></div>
        <div className="row">
          {SensorList}
        </div>

        <div className="add-sensor">
          <button className="btn btn-success btn-lg" onClick={this.addSensor.bind(this)}>Add Sensor</button>
        </div>
      </div>
    );
  }

}

export default SensorDashboard;
