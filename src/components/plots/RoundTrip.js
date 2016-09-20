import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';
// material-ui
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
// import Theme from '../../helpers/theme.js';
import { connect } from 'react-redux';
import ethData from 'static/bigio-roundtrip-ethernet.json';
import wifiData from 'static/bigio-roundtrip-wifi.json';
import localData from 'static/bigio-roundtrip-local.json';
import socketEthData from 'static/websocket-roundtrip-ethernet.json';
import socketWifiData from 'static/websocket-roundtrip-wifi.json';
import socketLocalData from 'static/websocket-roundtrip-local.json';
/* eslint-disable react/jsx-no-bind */

class Position extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object
  }

  constructor () {
    super();
    this.state = {};
  }

  componentDidMount () {
    const bigioPlotDiv = ReactDOM.findDOMNode(this.bigioPlotRef);
    const socketPlotDiv = ReactDOM.findDOMNode(this.socketPlotRef);
    // const plotDiv = ReactDOM.findDOMNode(this);
    this.setState({
      bigioPlotDiv,
      socketPlotDiv
    });
    Plotly.newPlot(bigioPlotDiv, this.createPlotData(this.props.data), this.createLayout('BigIO'));
    Plotly.newPlot(socketPlotDiv, this.createSocketPlotData(), this.createLayout('Websocket'));
  }

  componentWillReceiveProps (nextProps) {
    const { bigioPlotDiv, socketPlotDiv } = this.state;
    this.props = nextProps;
    if (bigioPlotDiv) {
      Plotly.newPlot(bigioPlotDiv, this.createPlotData(nextProps.data), this.createLayout('BigIO'));
    }
    if (socketPlotDiv) {
      Plotly.newPlot(socketPlotDiv, this.createSocketPlotData(), this.createLayout('Websocket'));
    }
  }

  createPlotData (data) {
    let delta;

    const ethernetDeltas = [];
    const ethernet = fromJS(ethData);
    console.log('bigio ethernet');
    ethernet.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        ethernetDeltas.push(delta);
      }
    });

    const wifiDeltas = [];
    const wifi = fromJS(wifiData);
    console.log('bigio wifi');
    wifi.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        wifiDeltas.push(delta);
      }
    });

    const localDeltas = [];
    const local = fromJS(localData);
    console.log('bigio local');
    local.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        localDeltas.push(delta);
      }
    });

    return [
      {
        type: 'histogram',
        x: ethernetDeltas,
        name: 'Ethernet',
        opacity: 0.5,
        marker: {
          color: 'green'
        }
      },
      {
        type: 'histogram',
        x: localDeltas,
        name: 'Local',
        opacity: 0.5,
        marker: {
          color: 'blue'
        }
      },
      {
        type: 'histogram',
        x: wifiDeltas,
        name: 'Wifi',
        opacity: 0.5,
        marker: {
          color: 'red'
        }
      }
    ];
  }

  createSocketPlotData (data) {
    let delta;

    const ethernetDeltas = [];
    const ethernet = fromJS(socketEthData);
    console.log('websocket ethernet');
    ethernet.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        ethernetDeltas.push(delta);
      }
    });

    const wifiDeltas = [];
    const wifi = fromJS(socketWifiData);
    console.log('websocket wifi');
    wifi.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        wifiDeltas.push(delta);
      }
    });

    const localDeltas = [];
    const local = fromJS(socketLocalData);
    console.log('websocket local');
    local.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      if (delta > 100) {
        console.log(delta);
      } else {
        localDeltas.push(delta);
      }
    });

    return [
      {
        type: 'histogram',
        x: ethernetDeltas,
        name: 'Ethernet',
        opacity: 0.5,
        marker: {
          color: 'green'
        }
      },
      {
        type: 'histogram',
        x: localDeltas,
        name: 'Local',
        opacity: 0.5,
        marker: {
          color: 'blue'
        }
      },
      {
        type: 'histogram',
        x: wifiDeltas,
        name: 'Wifi',
        opacity: 0.5,
        marker: {
          color: 'red'
        }
      }
    ];
  }

  createLayout (title) {
    return {
      title: `${title} Round Trip Latency`,
      height: '795',
      width: '1510',
      xaxis: {
        title: 'Time (ms)',
        range: [0, 100]
      },
      font: {
        size: 22
      },
      yaxis: {
        title: 'Frequency',
        range: [0, 800]
      },
      barmode: 'overlay'
    };
  }

  config = {
    showLink: false
    // displayModeBar: true
  };

  render () {
    return (
      <Tabs>
        <Tab label='BigIO' >
          <div ref={r => (this.bigioPlotRef = r)}/>
        </Tab>
        <Tab label='Websocket' >
          <div ref={r => (this.socketPlotRef = r)}/>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Position);
