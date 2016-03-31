import React from 'react';

export class PlotView extends React.Component {
  render () {
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
