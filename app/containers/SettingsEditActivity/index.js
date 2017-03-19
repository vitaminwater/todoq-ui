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

import { loadActivity } from './actions';
import { updateActivity } from 'common/actions';
import ActivityForm from 'components/ActivityForm';

export class SettingsEditActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  _handleSubmit = (activity) => {
    const imageFieldType = Object.prototype.toString.call(activity.get('image'));
    if (imageFieldType !== '[object File]') {
      activity = activity.delete('image');
    }
    this.props.updateActivity(activity);
  }

  componentWillMount() {
    const { activityId } = this.props.params;
    this.props.loadActivity(activityId);
  }

  componentWillReceiveProps(nextProps) {
    const { activityId } = this.props.params;
    const { activityId: nextActivityId } = nextProps.params;
    if (activityId != nextActivityId) {
      this.props.loadActivity(nextActivityId);
    }
    return;
  }

  render() {
    const { activity } = this.props;
    return (
      <div>
        <ActivityForm onSubmit={this._handleSubmit} initialValues={activity} activityId={activity && activity.get('id')} />
      </div>
    );
  }
}

SettingsEditActivity.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  activity: makeSelectSettingsEditActivity(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadActivity: (activityId) => dispatch(loadActivity(activityId)),
    updateActivity: (activity) => dispatch(updateActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditActivity);
