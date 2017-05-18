import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SensorDashboard from './SensorDashboard';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket : io('http://localhost:3000'),
    };
  }
  render(){
    return (
      <div id="app">
        <SensorDashboard socket={this.state.socket}/>
      </div>
    );
  }
}

export default Dashboard;
