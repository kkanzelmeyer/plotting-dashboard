import React, { Component, PropTypes } from 'react';
import SummaryWidget from 'components/SummaryWidget';
import getMetrics from './SummaryMetrics';

export class SummaryView extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  render () {
    const { data } = this.props;
    const metrics = getMetrics(data);
    return (
      <div>
        <SummaryWidget
          title='Total Threats'
          metric={metrics.totalThreats}
        />
        <h4>Under Construction</h4>
      </div>
    );
  };
}

export default SummaryView;
