import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */


class AppBarExampleIcon extends Component {

constructor(props) {
   super(props);

   this.state = {
     open: false,
   };
 }


 handleTouchTap = (event) => {
   // This prevents ghost click.
   event.preventDefault();

   this.setState({
     open: true,
     anchorEl: event.currentTarget,
   });
 };

 handleRequestClose = () => {
   this.setState({
     open: false,
   });
 };

render () {
  const iconStyles = {
    color: '#fff',
  };
  return (
    <AppBar
      title= {
        <span>
          <span onTouchTap={this.handleTouchTap}>Layers <NavigationArrowDropDown style={iconStyles} /></span>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Legend" />
              <MenuItem primaryText="Table" />
              <MenuItem primaryText="Edit" />
            </Menu>
          </Popover>
        </span>
      }
      iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  )};
}

export default AppBarExampleIcon;