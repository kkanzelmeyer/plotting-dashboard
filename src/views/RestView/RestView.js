import React from 'react';
import Rest from 'components/plots/REST';

export class RestView extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flex: '1',
        backgroundColor: '#fff',
        paddingLeft: '25px'
      }}>
        <Rest />
      </div>
    );
  }
}

export default RestView;
