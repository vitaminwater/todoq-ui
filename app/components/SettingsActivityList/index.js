/**
*
* SettingsActivityList
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left" >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class SettingsActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;

    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <ListItem
                key={activity.get('id')}
                rightIconButton={rightIconMenu}
                primaryText={activity.get('name')}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
            );
          })
        }
      </List>
    );
  }
}

SettingsActivityList.propTypes = {

};

export default SettingsActivityList;
