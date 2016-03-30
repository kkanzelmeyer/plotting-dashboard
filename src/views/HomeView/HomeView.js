import React from 'react';
import styles from './HomeView.scss';

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-3 col-xs-offset-4'>
            <label>Select JSON Log:</label>
            <input type='file' id='file' name='file'/>
          </div>
        </div>
        <div className='row'>
          <div id={styles.fileDrag}>
            <h3>or drop files here</h3>
          </div>
        </div>
      </div>
    );
  }

}

export default HomeView;
