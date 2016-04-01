import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import './HomeView.scss';
import { bindActionCreators } from 'redux';
import { addData } from '../../redux/modules/log-data';

export class HomeView extends React.Component {

  constructor () {
    super();
    this.onDrop = this.onDrop.bind(this);
  }

  static propTypes = {
    addData: PropTypes.func
  }
  /**
   * Receives the dropped file(s) from the drop zone.
   * @param  {[file]} files The file uploaded by the user
   */
  onDrop (files) {
    console.debug('Received files: ', files);
    const { addData } = this.props;

    // file reader to parse input file
    const fr = new FileReader();
    fr.addEventListener('load', function (e) {
      console.debug('Finished loading file');
      // TODO try stripping last few characters by brute force
      // or using a ramda utility to do it. Time the results
      const logData = `[${e.target.result.replace(/[,]\s+$/g, '')}]`;
      addData(JSON.parse(logData));
    });
    fr.readAsText(files[0]);
  }

  /**
   * The styles for the drop zone
   * @type {Object}
   */
  dropzoneStyle = {
    textAlign: 'center',
    margin: '0',
    padding: '200px 0',
    color: '#aaa',
    border: '2px dashed #aaa',
    borderRadius: '7px',
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  /**
   * Creates the drop zone element
   */
  render () {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 88px)'
        }}
      >
        <Dropzone onDrop={this.onDrop} style={this.dropzoneStyle}>
          <div style={{ textAlign: 'center' }}>
            <h3>Drag and drop log file here</h3>
            <h5>Or click to browse for log file</h5>
          </div>
        </Dropzone>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  data: state.data
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
