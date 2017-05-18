import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from './Charts'

class Sensor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphDataTemp : [
        this.props.TEMP
      ],
      graphDataVolts : [
        this.props.VOLTS
      ],
      graphDataAmps : [
        this.props.AMPS
      ],
      graphLabels : [
        (new Date()).getTime()
      ],
      graphInterval : 1
    }

  }

  componentWillMount() {

    let timer  = setInterval( () => {
      this.props.socket.emit('sensorPing', this.props.UUID );
    }, this.props.INCREMENT_TIME);

    let graphTimer = setInterval( () => {
        this.props.socket.emit('newGraphData', this.props.UUID, this.state.graphInterval);
    }, 10000)
    this.setState(() => {
      return { timer, graphTimer };
    })

    this.props.socket.on(`graphData_${this.props.UUID}`, (data) => {

      let graphDataTemp   = [];
      let graphDataAmps   = [];
      let graphDataVolts  = [];
      let graphDataLabels = [];


      data.forEach((point) => {
        graphDataTemp.push(point.TEMP);
        graphDataAmps.push(point.AMPS);
        graphDataVolts.push(point.VOLTS);
        graphDataLabels.push(point.timestamp)
      })


      this.setState(() => {
        return { graphDataTemp, graphDataVolts, graphDataAmps, graphDataLabels };
      })
    });

    this.props.socket.emit('newGraphData', this.props.UUID, this.state.graphInterval);
  }
  componentWillUnmount(){

    this.props.socket.removeListener(`graphData_${this.props.UUID}`)
    this.setState((prevState) => {
      clearInterval(prevState.timer);
      clearInterval(prevState.graphTimer);

      return {timer : null, graphTimer : null}
    });


  }
  componentWillReceiveProps(nextProps) {
    /*
    * If the timer value is change, we need to update the time out
    */
    if (this.props.INCREMENT_TIME !== nextProps.INCREMENT_TIME) {
      this.setState((prevState) => {
          clearInterval(prevState.timer);
          return {
            timer : setInterval( () => {
              this.props.socket.emit('sensorPing', this.props.UUID );
            }, nextProps.INCREMENT_TIME)
          }
      })
    }
  }
  render(){
    return (
      <div id="sensor-${this.props.UUID}" className="col-xs-12 col-sm-12 col-med-12 col-lg-12 table-responsive">
        <h3>Sensor {this.props.UUID}</h3>


        <Chart {...this.state}/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Checkin Interval</th>
              <th>Temperature</th>
              <th>Voltage</th>
              <th>Currents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'INCREMENT_TIME')}>-</button>
                <span> {this.props.INCREMENT_TIME} ms </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'INCREMENT_TIME')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'TEMP')}>-</button>
                <span> {this.props.TEMP} &deg;F </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'TEMP')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'VOLTS')}>-</button>
                <span> {this.props.VOLTS} V </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'VOLTS')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'AMPS')}>-</button>
                <span> {this.props.AMPS.toFixed(2)} A </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'AMPS')}>+</button>
              </td>
            </tr>
            <tr>
              <td colSpan="4">Thresholds</td>
            </tr>
            <tr>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'TIME_THRESHOLD')}>-</button>
                <span> {this.props.TIME_THRESHOLD} ms </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'TIME_THRESHOLD')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'TEMP_THRESHOLD')}>-</button>
                <span> {this.props.TEMP_THRESHOLD} &deg;F </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'TEMP_THRESHOLD')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'VOLTS_THRESHOLD')}>-</button>
                <span> {this.props.VOLTS_THRESHOLD} V </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'VOLTS_THRESHOLD')}>+</button>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'decr', 'AMPS_THRESHOLD')}>-</button>
                <span> {this.props.AMPS_THRESHOLD.toFixed(2)} A </span>
                <button className="btn btn-sm btn-primary" onClick={this.updateSensor.bind(this, 'incr', 'AMPS_THRESHOLD')}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-med-6 col-lg-6 text-left">
            <label htmlFor="graphInterval">Graph Interval </label>
            <select name="graphInterval" ref={(select) => { this.graphSelect = select; }} value={this.state.graphInterval} onChange={this.updateGraphInterval.bind(this)}>
              <option value="1">Last 1 minutes</option>
              <option value="5">Last 5 minutes</option>
              <option value="10">Last 10 minutes</option>
              <option value="60">Last 60 minutes</option>
            </select>

          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-med-6 col-lg-6 text-left">
            <p>Last Checkin: {this.props.LAST_PING}</p>
          </div>
          <div className="col-xs-6 col-sm-6 col-med-6 col-lg-6 text-right">
              <p><button className="btn btn-danger btn-sm" onClick={this.removeSensor.bind(this)}>Remove Sensor</button></p>
          </div>
        </div>
      </div>
    )
  }
  updateGraphInterval(){
    this.props.socket.emit('newGraphData', this.props.UUID, this.graphSelect.value);
    this.setState(() => {
      return { graphInterval : this.graphSelect.value}
    })
  }
  removeSensor() {
    this.props.socket.emit('removeSensor', this.props.UUID);
  }
  updateSensor(operation, key) {
    let incrementer;
    let val = this.props[key];

    switch (key) {

      case 'INCREMENT_TIME' :
      case 'TIME_THRESHOLD' :
        incrementer = 100;
        break;
      case 'AMPS' :
      case 'AMPS_THRESHOLD' :
        incrementer = 0.1;
        break;
      default:
        incrementer = 1;
    }

    switch(operation) {
      case 'incr' :
        val = this.props[key] + incrementer;
        break;
      case 'decr' :
        val = this.props[key] - incrementer;
        break;
    }

    /*
    * If you have increment time of zero, you might have a bad time
    */
    if( val < 1) val = 1;

    this.props.socket.emit('updateSensor', { operation, key, val, uuid : this.props.UUID});
  }
}

export default Sensor;
