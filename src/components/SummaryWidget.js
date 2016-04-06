import React, { PropTypes, Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

class SummaryWidget extends Component {

  static propTypes = {
    title: PropTypes.string,
    metrics: PropTypes.object
  }

  render () {
    const { title } = this.props;
    return (
      <Card>
        <CardHeader
          title={title}
          subtitle='Subtitle'
        />
      </Card>
    );
  }
}

export default SummaryWidget;
