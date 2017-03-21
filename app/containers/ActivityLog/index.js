/*
 *
 * ActivityLog
 *
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectActivityLog from './selectors';
import messages from './messages';

import { loadMoreLogs } from './actions';
import { logsSelector } from './selectors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: stretch;
  align-items: stretch;
  align-content: stretch;
`;

const LogsContainer = styled.div`
  flex: 1;
  flex-direction: column-reverse;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10pt;
  justify-content: stretch;
  align-items: stretch;
  align-content: stretch;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 2px dashed #E0E0E0;
  padding: 5px;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  margin-right: 5pt;

  &:focus { outline:none; }
`;

export const Button = styled.button`
  background-color: #A7CEA7;
  padding: 5pt;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  border: 1pt solid #979797;
  cursor: pointer;
`;

export class ActivityLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();

    this.state = {msg: ''};
  }

  componentWillMount() {
    const { activityId } = this.props.params;
    this.props.loadMoreLogs(activityId);
  }

  render() {
    const { logs } = this.props;
    return (
      <Container>
        <LogsContainer>
          {
            logs.map(log => (
              <div>
                lol
                {log.get('content')}
              </div>
            ))
          }
        </LogsContainer>
        <InputContainer>
          <TextArea value={this.state.msg} onChange={({ target: { value: msg } }) => this.setState({msg})} onKeyPress={this._handleKeyPress} />
          <Button>SEND</Button>
        </InputContainer>
      </Container>
    );
  }

  _handleKeyPress = (e) => {
    if (e.charCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      console.log(`sending ${this.state.msg}`);
      this.setState({msg: ''});
    }
  }
}

ActivityLog.propTypes = {
  loadMoreLogs: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  logs: logsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadMoreLogs: (activityId) => dispatch(loadMoreLogs(activityId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
