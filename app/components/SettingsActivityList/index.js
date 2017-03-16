/**
*
* SettingsActivityList
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { List, Item } from 'components/UIKit/list';
import SettingsListItem from 'components/SettingsListItem';

class SettingsActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;

    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <SettingsListItem key={activity.get('id')} activity={activity} />
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
