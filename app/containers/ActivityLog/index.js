/*
 *
 * ActivityLog
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectActivityLog from './selectors';
import messages from './messages';

export class ActivityLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="ActivityLog"
          meta={[
            { name: 'description', content: 'Description of ActivityLog' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ActivityLog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ActivityLog: makeSelectActivityLog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
