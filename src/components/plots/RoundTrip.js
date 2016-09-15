import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';
// import Theme from '../../helpers/theme.js';
import { connect } from 'react-redux';
import ethData from 'static/bigio-roundtrip-ethernet.json';
import wifiData from 'static/bigio-roundtrip-wifi.json';
import localData from 'static/bigio-roundtrip-local.json';

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
    const plotDiv = ReactDOM.findDOMNode(this);
    this.setState({
      plotDiv
    });
    Plotly.newPlot(plotDiv, this.createPlotData(this.props.data), this.createLayout());
  }

  componentWillReceiveProps (nextProps) {
    const { plotDiv } = this.state;
    this.props = nextProps;
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    let delta;

    const ethernetDeltas = [];
    const ethernet = fromJS(ethData);
    ethernet.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      ethernetDeltas.push(delta);
    });

    const wifiDeltas = [];
    const wifi = fromJS(wifiData);
    wifi.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      wifiDeltas.push(delta);
    });

    const localDeltas = [];
    const local = fromJS(localData);
    local.forEach((row) => {
      delta = row.get('receive') - row.get('publish');
      localDeltas.push(delta);
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

  createLayout () {
    return {
      title: 'BigIO Round Trip Latency',
      height: '860',
      width: '1500',
      xaxis: {
        title: 'Time (ms)'
      },
      yaxis: {
        title: 'Frequency'
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
      <div />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Position);
