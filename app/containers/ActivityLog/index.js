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
import moment from 'moment';

import makeSelectActivityLog from './selectors';
import messages from './messages';

import Loading from 'components/Loading';

import {
  loadMoreLogs,
  createLog,
  reset,
  subscribeLog,
  unsubscribeLog,
} from './actions';
import { loadActivity } from 'common/actions';
import {
  activitySelector,
  logsSelector,
  loadingSelector
} from './selectors';

import NoteLog from 'components/log/NoteLog';
import LinkLog from 'components/log/LinkLog';
import TodoLog from 'components/log/TodoLog';
import UnprocessedLog from 'components/log/UnprocessedLog';

import Container from './components/Container';
import LogsContainer from './components/LogsContainer';
import LogContainer from './components/LogContainer';
import LogDate from './components/LogDate';
import LogTime from './components/LogTime';
import InputContainer from './components/InputContainer';
import TextArea from './components/TextArea';
import Button from './components/Button';

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
    this.props.subscribeLog(activityId);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.textarea).focus();
  }

  componentWillReceiveProps(nextProps) {
    const { params: { activityId }, logs } = this.props;
    const { params: { activityId: nextActivityId }, logs: nextLogs } = nextProps;
    if (activityId != nextActivityId) {
      this.props.unsubscribeLog(activityId);
      this._handleLoadData(nextActivityId);
      this.props.subscribeLog(nextActivityId);
      ReactDOM.findDOMNode(this.refs.textarea).focus();
    }
    if (logs.size && nextLogs.size && (logs.get('0').get('id') != nextLogs.get('0').get('id'))) {
      setTimeout(() => {
        const elem = ReactDOM.findDOMNode(this.refs.logScroll);
        elem.scrollTop = elem.scrollHeight;
      }, 30);
    }
  }

  componentWillUnmount() {
    const { activityId } = this.props.params;
    this.props.unsubscribeLog(activityId);
  }

  renderLog(log, i, nextLog) {
    const type = log.get('type'),
      Log = LOG_ELEMS[type],
      logDate = moment(log.get('inserted_at')), nextLogDate = moment(nextLog ? nextLog.get('inserted_at') : undefined),
      printDaySeparator = !!(logDate.dayOfYear() + logDate.year() != nextLogDate.dayOfYear() + nextLogDate.year());
    return (
      <div key={log.get('id')}>
        { printDaySeparator && <LogTime log={log} /> }
        <LogContainer>
          <LogDate log={log} />
          <Log log={log} />
        </LogContainer>
      </div>
    );
  }

  render() {
    const { logs, activity, loading } = this.props;
    return (
      <Container color={activity && activity.get('color')}>
        <LogsContainer ref='logScroll'>
          {
            logs.map((log, i) => this.renderLog(log, i, i < logs.size-1 ? logs.get(i+1) : undefined))
          }
        </LogsContainer>
        <InputContainer>
          <TextArea ref='textarea' value={this.state.text} onChange={({ target: { value: text } }) => this.setState({text})} onKeyPress={this._handleKeyPress} />
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
    subscribeLog: (activityId) => dispatch(subscribeLog(activityId)),
    unsubscribeLog: (activityId) => dispatch(unsubscribeLog(activityId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
