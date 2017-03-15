/**
*
* SettingsActivityList
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { List, Item } from 'uikit/list';

class SettingsActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;

    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <Item key={activity.get('id')}>
                Lol
              </Item>
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
