import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import Theme from '../../helpers/theme';
import {
  Spacing,
  Typography
} from 'material-ui/lib/styles';
// import logo from '../../static/logo.jpg';

const SelectableList = SelectableContainerEnhance(List);

export default class AppLeftNav extends React.Component {

  static propTypes = {
    docked: React.PropTypes.bool.isRequired,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeLeftNav: React.PropTypes.func.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.object
  };

  handleRequestChangeLink (event, value) {
    window.location = value;
  }

  handleTouchTapHeader () {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false
    });
  }

  get styles () {
    return {
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: Typography.textFullWhite,
        lineHeight: `${Spacing.desktopKeylineIncrement}px`,
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Theme.palette.primary1Color,
        paddingLeft: 4,
        marginBottom: 8
      }
    };
  }

  render () {
    const {
      location,
      docked,
      onRequestChangeLeftNav,
      onRequestChangeList,
      open,
      style
    } = this.props;

    const {
      prepareStyles
    } = this.context.muiTheme;

    const styles = this.styles;

    return (
      <LeftNav
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeLeftNav}
        zDepth={0}
      >
        <div style={prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
          <span height={86}>{Theme.companyName}</span>
        </div>
        <SelectableList
          valueLink={{ value: location.pathname, requestChange: onRequestChangeList }}
        >
          <ListItem primaryText='Summary' value='/' />
          <ListItem primaryText='Plot Demo' value='/plot/plot-demo' />
        </SelectableList>
      </LeftNav>
    );
  }
}
