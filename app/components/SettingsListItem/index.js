/**
*
* SettingsListItem
*
*/

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ItemDiv = styled.div`
  border-bottom: 1pt dashed #E0E0E0;
  padding: 10pt;

  & a {
    margin-right: 10pt;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Image = styled.img`
  margin-right: 10pt;
  border-radius: 20pt;
  float: left;
  width: 40pt;
  height: 40pt;
`;

const SubText = styled.span`
  font-size: 0.9em;
  font-weight: 100;
  color: #676767;
`;

const Clear = styled.div`
  clear: both;
`;

class SettingsListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { activity } = this.props;
    return (
      <ItemDiv>
        <Image src={`http://localhost:8000${activity.get('image')}`} />
        {activity.get('name')}<br/ >
        <SubText>Never done yet</SubText>
        <Clear />
        <Link to={`/settings/activity/${activity.get('id')}/edit`}>Edit</Link>
        <Link to={`/settings/activity/${activity.get('id')}/stats`}>Stats</Link>
        <Link onClick={this._handleDelete}>Delete</Link>
      </ItemDiv>
    );
  }

  _handleDelete = (e) => {
    e.preventDefault();
    const { activity } = this.props;
    this.props.onDelete(activity);
  }
}

SettingsListItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default SettingsListItem;
