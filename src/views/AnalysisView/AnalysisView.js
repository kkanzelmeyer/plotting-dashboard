import React from 'react';
import RoundTrip from 'components/plots/RoundTrip';

export class AnalysisView extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flex: '1',
        backgroundColor: '#fff'
      }}>
        <RoundTrip />
      </div>
    );
  }
}

export default AnalysisView;
