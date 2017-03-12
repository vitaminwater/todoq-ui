/**
*
* SettingsActivityList
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  
`;

class SettingsActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

SettingsActivityList.propTypes = {

};

export default SettingsActivityList;
