/**
*
* Timeline
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { List, Item } from 'components/UIKit/list';

class Timeline extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;
    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <Item onClick={this._handleOpen(activity)} key={activity.get('id')}>
                {activity.get('name')}
              </Item>
            );
          })
        }
      </List>
    );
  }

  _handleOpen = activity => (e) => {
    e.preventDefault();
    this.props.onOpen(activity);
  }
}

Timeline.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default Timeline;
