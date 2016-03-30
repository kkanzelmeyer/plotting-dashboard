import React from 'react';
import Dropzone from 'react-dropzone';
import './HomeView.scss';

export class HomeView extends React.Component {

  onDrop = function (files) {
    console.log('Received files: ', files);
  };

  // TODO make dropzone full screen
  dropzoneStyle = {
    textAlign: 'center',
    padding: '200px 0',
    margin: '0',
    color: '#aaa',
    border: '2px dashed #aaa',
    borderRadius: '7px',
    cursor: 'pointer'
  };

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Dropzone onDrop={this.onDrop} style={this.dropzoneStyle}>
            <h3>Drag and drop log file here</h3>
            <h5>Or click to browse for log file</h5>
          </Dropzone>
        </div>
      </div >
    );
  };

}

export default HomeView;
