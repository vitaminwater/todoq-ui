/**
*
* Timeline
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { List, Item } from 'uikit/list';

class Timeline extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;
    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <Item key={activity.get('id')}>
                {activity.get('name')}
              </Item>
            );
          })
        }
      </List>
    );
  }
}

Timeline.propTypes = {

};

export default Timeline;
