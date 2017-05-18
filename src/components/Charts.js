import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';


const chartOptions = {
  scales: {
    yAxes: [{
        ticks: {}
    }],
    xAxes: [{
      ticks: {
        display :false
      }
    }]
  }
}

class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let graphDataTemp = {
      labels : this.props.graphDataLabels,
      datasets : [{
        label  : "temp",
        fill : false,
        pointBorderColor:"rgba(127,192,192,1)",
        data : this.props.graphDataTemp
      }]
    };
    let graphDataVolts = {
      labels : this.props.graphDataLabels,
      datasets : [{
        label  : "volts",
        fill : false,
        pointBorderColor:"rgba(32,192,192,1)",
        data : this.props.graphDataVolts
      }]
    };
    let graphDataAmps = {
      labels : this.props.graphDataLabels,
      datasets : [{
        label  : "amps",
        fill : false,
        pointBorderColor:"rgba(91, 120,192,1)",
        data : this.props.graphDataAmps
      }]
    }

    let tempOptions  = {...chartOptions};
    let voltsOptions = {...chartOptions };
    let ampsOptions = {...chartOptions };

    return (
        <div className="row">
          <div className="col-sm-6 col-med-6 col-lg-3 ">
            <Line data={graphDataTemp } options={tempOptions} width={480} height={225}/>
          </div>
          <div className="col-sm-6 col-med-6 col-lg-3 ">
            <Line data={graphDataVolts} options={voltsOptions} width={480} height={225}/>
          </div>
          <div className="col-sm-6 col-med-6 col-lg-3 ">
            <Line data={graphDataAmps} options={ampsOptions} width={480} height={225}/>
          </div>
        </div>
      )
    }
}

export default Charts;
