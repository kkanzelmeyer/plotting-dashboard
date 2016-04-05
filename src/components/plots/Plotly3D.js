import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class Plotly3D extends React.Component {

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
      plotDiv.data = this.createPlotData(nextProps.data);
      Plotly.redraw(plotDiv);
    }
  }

  createPlotData (data) {
    let truthX = [];
    let truthY = [];
    let truthZ = [];
    let trackX = [];
    let trackY = [];
    let trackZ = [];

    data.forEach((row) => {
      if (row.get('type') === 'truth') {
        truthX.push(row.get('sv_ecef_x'));
        truthY.push(row.get('sv_ecef_y'));
        truthZ.push(row.get('sv_ecef_z'));
      }
      if (row.get('type') === 'track') {
        trackX.push(row.get('sv_ecef_x'));
        trackY.push(row.get('sv_ecef_y'));
        trackZ.push(row.get('sv_ecef_z'));
      }
    });

    return [
      {
        type: 'scatter3d',
        x: truthX,
        y: truthY,
        z: truthZ,
        mode: 'markers',
        marker: {
          size: 8,
          opacity: 0.6,
          symbol: 'diamond'
        },
        name: 'Truth'
      },
      {
        type: 'scatter3d',
        x: trackX,
        y: trackY,
        z: trackZ,
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'dot'
        },
        name: 'Track'
      }
    ];
  }

  createLayout () {
    return {
      title: this.props.title
    };
  }

  config = {
    showLink: false,
    displayModeBar: true
  };

  makePlot () {

  }

  render () {
    return (
      <div />
    );
  }
}

export default Plotly3D;
