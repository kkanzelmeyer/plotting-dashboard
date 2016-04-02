import React from 'react';
import List from 'material-ui/lib/lists/list';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

// Mutliselect higher order component
let SelectableList = SelectableContainerEnhance(List);
function wrapState (ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState () {
      // TODO shouldn't be hard coded
      return {selectedIndex: 2008};
    },
    handleUpdateSelectedIndex (e, index) {
      this.setState({
        selectedIndex: index
      });
    },
    render () {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    }
  });
  return StateWrapper;
}
SelectableList = wrapState(SelectableList);

export default SelectableList;
