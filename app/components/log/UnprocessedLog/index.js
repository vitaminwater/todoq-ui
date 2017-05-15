/**
*
* UnprocessedLog
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import loading from 'components/log/common/img/loading.svg';

import {
  Log,
  LogIcon,
} from 'components/log/common/layout';

class UnprocessedLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { log, first } = this.props;
    return (
      <Log first={first}>
        <LogIcon src={loading} />
        {log.get('text')}
      </Log>
    );
  }
}

UnprocessedLog.propTypes = {

};

export default UnprocessedLog;
