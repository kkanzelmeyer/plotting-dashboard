import React, { PropTypes, Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import ThreatChart from 'components/plots/ThreatChart';

class SummaryWidget extends Component {

  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
  }

  render () {
    const { title, data } = this.props;
    return (
      <Card>
        <CardHeader
          title={title}
          style={{
            marginBottom: '-40px'
          }}
        />
        <CardMedia>
          <ThreatChart
            data={data}
            />
        </CardMedia>
      </Card>
    );
  }
}

export default SummaryWidget;
