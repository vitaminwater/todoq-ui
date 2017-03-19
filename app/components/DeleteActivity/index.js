/**
*
* DeleteActivity
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Button, ButtonCancel} from 'components/UIKit/form';

const OverlayDiv = styled.div`
  position: absolute;
  z-index: 11;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);

  & > * {
    position: absolute;
    display: block;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: white;
    border: 1px solid #a0a0a0;
    padding: 10pt;
    max-width: 100%;
  }
`;

class DeleteActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { activity } = this.props;
    return (
      <OverlayDiv>
        <div>
          <b>Delete Activity  ?</b><br /><br />
          <i>{ activity.get('name') }</i>
          <p>
            This is NOT revertible.
          </p>
          <ButtonCancel onClick={this._handleCancel}>
            Cancel
          </ButtonCancel>&nbsp;&nbsp;
          <Button onClick={this._handleOK}>
            Delete activity
          </Button>
        </div>
      </OverlayDiv>
    );
  }

  _handleOK = (e) => {
    e.preventDefault();
    this.props.onOk();
  }

  _handleCancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  }
}

DeleteActivity.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteActivity;
