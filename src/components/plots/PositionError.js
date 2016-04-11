import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';
// import vec3 from 'gl-vec3';
import { Vector3, CatmullRomCurve3 } from 'three';

class PositionError extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }

  constructor () {
    console.debug('position error');
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
    let truths = [];
    let tracks = [];

    // separate data into new arrays
    data.forEach((row, i) => {
      let point = (new Vector3(
        row.get('sv_ecef_x'),
        row.get('sv_ecef_y'),
        row.get('sv_ecef_z')
      ));
      if (row.get('type') === 'truth') {
        truths.push(point);
      }
      if (row.get('type') === 'track') {
        tracks.push(point);
      }
    });
    const truthSpline = new CatmullRomCurve3(truths);
    const trackSpline = new CatmullRomCurve3(tracks);
    let errors = [];
    let i;
    let indexes = [];
    for (i = 0; i < 1; i += 0.1) {
      let truthPoint = truthSpline.getPoint(i);
      let trackPoint = trackSpline.getPoint(i);
      let distance = truthPoint.distanceTo(trackPoint);
      errors.push(distance/truthPoint.length()*100);
      indexes.push(i);
    }
    return [{
      type: 'scatter',
      x: indexes,
      y: errors,
      mode: 'markers+lines',
      marker: {
        size: 8,
        opacity: 0.6,
        symbol: 'dot'
      },
      line: {
        opacity: 0.5,
        width: 2,
        shape: 'spline'
      },
      name: 'Truth'
    }];
  }

  createLayout () {
    const { title, width, height } = this.props;
    return {
      title,
      width,
      height,
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Error',
        range: [0, 0.03]
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

export default PositionError;
