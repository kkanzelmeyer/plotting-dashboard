import React, { PropTypes } from 'react';

export class PlotView extends React.Component {

  static propTypes = {
    params: PropTypes.object
  }

  render () {
    const { params } = this.props;
    console.debug(params.plotType);

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div idName='plotView'>
            // Leave this div empty for the Plotly plot
          </div>
        </div>
      </div >
    );
  };
}

export default PlotView;
