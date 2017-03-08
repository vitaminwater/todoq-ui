/**
*
* Timeline
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

class Timeline extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activities } = this.props;
    return (
      <List>
        {
          activities.map((activity) => {
            return (
              <Item key={activity.id}>
                {activity.name}
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