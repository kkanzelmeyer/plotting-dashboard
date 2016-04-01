import React, { PropTypes } from 'react';
import PlotDemo from 'components/plots/PlotDemo';

export class PlotView extends React.Component {

  static propTypes = {
    params: PropTypes.object
  }

  render () {
    const { params } = this.props;
    console.debug(params.plotType);

    switch (params.plotType) {
      case 'plot-demo':
        this.plot = <PlotDemo />;
        break;

      default:
        break;
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 88px)'
        }}
      >
        <div idName='plotView'>
          {this.plot}
        </div>
      </div>
    );
  };
}

export default PlotView;
