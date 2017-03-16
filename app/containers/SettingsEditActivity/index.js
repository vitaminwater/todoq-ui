/*
 *
 * SettingsEditActivity
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSettingsEditActivity from './selectors';
import messages from './messages';

import ActivityForm from 'components/ActivityForm';

export class SettingsEditActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <ActivityForm />
      </div>
    );
  }
}

SettingsEditActivity.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SettingsEditActivity: makeSelectSettingsEditActivity(),
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditActivity);
