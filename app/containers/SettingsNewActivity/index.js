/*
 *
 * SettingsNewActivity
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSettingsNewActivity from './selectors';
import messages from './messages';

import ActivityForm from 'components/ActivityForm';

export class SettingsNewActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  _handleSubmit(activity) {
    console.log(activity);
  }

  render() {
    return (
      <div>
        <ActivityForm />
      </div>
    );
  }
}

SettingsNewActivity.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SettingsNewActivity: makeSelectSettingsNewActivity(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNewActivity);
