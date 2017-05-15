/**
*
* NoteLog
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import note from './img/note.svg';

import {
  Log,
  LogIcon,
} from 'components/log/common/layout';

class NoteLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      log,
    } = this.props;
    return (
      <Log>
        <LogIcon src={note} />
        {log.get('text')}
      </Log>
    );
  }
}

NoteLog.propTypes = {

};

export default NoteLog;
