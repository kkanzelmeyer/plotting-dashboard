import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class BeamPosition extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
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
    console.debug(this.createPlotData(this.props.data));
    Plotly.newPlot(plotDiv, this.createPlotData(this.props.data), this.createLayout());
  }

  componentWillReceiveProps (nextProps) {
    const { plotDiv } = this.state;
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    let beamX = [];
    let beamY = [];

    data.forEach((row) => {
      beamX.push(row.get('azDeg'));
      beamY.push(row.get('elDeg'));
    });

    return [{
      type: 'scatter',
      x: beamX,
      y: beamY,
      mode: 'markers',
      marker: {
        size: 18,
        opacity: 0.6,
        symbol: 'dot'
      },
      name: 'Beam Position'
    }];
  }

  createLayout () {
    return {
      title: this.props.title,
      width: this.props.width,
      height: this.props.height
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

export default BeamPosition;
