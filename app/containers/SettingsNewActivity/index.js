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

import { createActivity } from 'common/actions';
import ActivityForm from 'components/ActivityForm';

export class SettingsNewActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  _handleSubmit = (activity) => {
    this.props.createActivity(activity);
  }

  render() {
    return (
      <div>
        <ActivityForm onSubmit={this._handleSubmit} />
      </div>
    );
  }
}

SettingsNewActivity.propTypes = {
  createActivity: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SettingsNewActivity: makeSelectSettingsNewActivity(),
});

function mapDispatchToProps(dispatch) {
  return {
    createActivity: (activity) => dispatch(createActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNewActivity);
