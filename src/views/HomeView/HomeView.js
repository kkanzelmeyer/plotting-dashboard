import React from 'react';
import Dropzone from 'react-dropzone';
import { createStore } from 'redux';
import './HomeView.scss';
import { addData, type, dataModule } from '../../redux/modules/log-data';

export class HomeView extends React.Component {

  /**
   * Receives the dropped file(s) from the drop zone.
   * @param  {[file]} files The file uploaded by the user
   */
  onDrop = function (files) {
    console.debug('Received files: ', files);

    // create store
    let store = createStore(dataModule);

    const fr = new FileReader();

    fr.addEventListener('load', function (e) {
      console.debug('Finished loading file');
      const logData = '[' + e.target.result.replace(/[,]\s+$/g, '') + ']';
      console.debug(logData);
      const action = addData(type.SET_DATA, logData);
      store.dispatch(action);
    });

    fr.readAsText(files[0]);
  };

  /**
   * The styles for the drop zone
   * @type {Object}
   */
  dropzoneStyle = {
    textAlign: 'center',
    padding: '200px 0',
    margin: '0',
    color: '#aaa',
    border: '2px dashed #aaa',
    borderRadius: '7px',
    cursor: 'pointer'
  };

  /**
   * Creates the drop zone element
   */
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
