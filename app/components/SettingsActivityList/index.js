/**
*
* SettingsActivityList
*
*/

import React, { PropTypes } from 'react';
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
              <SettingsListItem 
                key={activity.get('id')}
                activity={activity}
                onDelete={this._handleDelete(activity)}/>
            );
          })
        }
      </List>
    );
  }

  _handleDelete = activity => () => {
    this.props.onDelete(activity);
  }
}

SettingsActivityList.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default SettingsActivityList;
