/*
 *
 * Settings
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivities } from './selectors';
import { loadActivities } from './actions';
import messages from './messages';
import ActivityList from 'components/SettingsActivityList';

export class Settings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.doLoadActivities();
  }

  render() {
    const { activities } = this.props;
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <ActivityList activities={activities} />
      </div>
    );
  }
}

Settings.propTypes = {
  doLoadActivities: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoadActivities: () => dispatch(loadActivities()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
