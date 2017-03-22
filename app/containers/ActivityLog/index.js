/*
 *
 * ActivityLog
 *
 */

import styled from 'styled-components';
import { fromJS } from 'immutable';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectActivityLog from './selectors';
import messages from './messages';

import Loading from 'components/Loading';

import { loadMoreLogs, createLog, reset } from './actions';
import { loadActivity } from 'common/actions';
import { activitySelector, logsSelector, loadingSelector } from './selectors';

import NoteLog from 'components/log/NoteLog';
import LinkLog from 'components/log/LinkLog';
import TodoLog from 'components/log/TodoLog';
import UnprocessedLog from 'components/log/UnprocessedLog';

const Container = styled.div`
  border-left: 6pt solid ${props => props.color || '#e0e0e0'};
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
  overflow-y: auto;
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

const LOG_ELEMS = {
  NOTE: NoteLog,
  LINK: LinkLog,
  TODO: TodoLog,
  UNPROCESSED: UnprocessedLog,
};

export class ActivityLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();

    this.state = {text: ''};
  }

  componentWillMount() {
    const { activityId } = this.props.params;
    this._handleLoadData(activityId);
  }

  componentWillReceiveProps(nextProps) {
    const { params: { activityId }, logs } = this.props;
    const { params: { activityId: nextActivityId }, logs: nextLogs } = nextProps;
    if (activityId != nextActivityId) {
      this._handleLoadData(nextActivityId);
    }
    if (logs.size && nextLogs.size && (logs.get('0').get('id') != nextLogs.get('0').get('id'))) {
      setTimeout(() => {
        const elem = ReactDOM.findDOMNode(this.refs.logScroll);
        elem.scrollTop = elem.scrollHeight;
      }, 30);
    }
  }

  renderLog(log, i) {
    const type = log.get('type');
    const Log = LOG_ELEMS[type];
    return (
      <Log first={i == 0} log={log} key={log.get('id')} />
    );
  }

  render() {
    const { logs, activity, loading } = this.props;
    console.log(activity && activity.get('color'));
    return (
      <Container color={activity && activity.get('color')}>
        <LogsContainer ref='logScroll'>
          {
            logs.map((log, i) => this.renderLog(log, i))
          }
        </LogsContainer>
        <InputContainer>
          <TextArea value={this.state.text} onChange={({ target: { value: text } }) => this.setState({text})} onKeyPress={this._handleKeyPress} />
          <Button onClick={this._handleSend}>SEND</Button>
        </InputContainer>
        {loading && <Loading />}
      </Container>
    );
  }

  _handleLoadData(activityId) {
    this.props.reset();
    this.props.loadActivity(activityId);
    this.props.loadMoreLogs(activityId);
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
      type: 'UNPROCESSED',
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
  activity: activitySelector(),
  logs: logsSelector(),
  loading: loadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadActivity: activityId => dispatch(loadActivity(activityId)),
    loadMoreLogs: activityId => dispatch(loadMoreLogs(activityId)),
    createLog: (activityId, log) => dispatch(createLog(activityId, log)),
    reset: () => dispatch(reset()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
