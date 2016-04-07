import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class ThreatChart extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string
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
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    return [{
      values: [data.airThreats.value],
      labels: [data.airThreats.label],
      hoverinfo: 'label+percent+name',
      hole: 0.6,
      type: 'pie',
      name: 'All Threats'
    }];
  }

  createLayout () {
    const { title } = this.props;
    return {
      title,
      height: 400,
      width: 400,
      margin: {
        t: 0,
        b: 0,
        l: 20,
        r: 0
      }
    };
  }

  config = {
    showLink: false,
    displayModeBar: true
  };

  render () {
    return (
      <div />
    );
  }
}

export default ThreatChart;
