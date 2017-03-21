/*
 *
 * ActivityLog
 *
 */

import styled from 'styled-components';
import { fromJS } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectActivityLog from './selectors';
import messages from './messages';

import { loadMoreLogs, createLog, reset } from './actions';
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
  display: flex;
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
  resize: none;

  &:focus { outline:none; }
`;

export const Button = styled.button`
  background-color: #A7CEA7;
  padding: 5pt 15pt;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  border: 1pt solid #979797;
  cursor: pointer;
`;

export class ActivityLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();

    this.state = {text: ''};
  }

  componentWillReceiveProps(nextProps) {
    const { activityId } = this.props.params;
    const { activityId: nextActivityId } = nextProps.params;
    if (activityId != nextActivityId) {
      this.props.reset();
      this.props.loadMoreLogs(nextActivityId);
    }
  }

  render() {
    const { logs } = this.props;
    return (
      <Container>
        <LogsContainer>
          {
            logs.map(log => (
              <div key={log.get('id')}>
                {log.get('text')}
              </div>
            ))
          }
        </LogsContainer>
        <InputContainer>
          <TextArea value={this.state.text} onChange={({ target: { value: text } }) => this.setState({text})} onKeyPress={this._handleKeyPress} />
          <Button onClick={this._handleSend}>SEND</Button>
        </InputContainer>
      </Container>
    );
  }

  _handleKeyPress = (e) => {
    if (e.charCode == 13 && e.shiftKey == false) {
      this._handleSend(e);
    }
  }

  _handleSend = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { activityId } = this.props.params;
    const log = fromJS({
      type: 'NOTE',
      text,
      content: {},
    });
    this.props.createLog(activityId, log);
    this.setState({text: ''});
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
    createLog: (activityId, log) => dispatch(createLog(activityId, log)),
    reset: () => dispatch(reset()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
