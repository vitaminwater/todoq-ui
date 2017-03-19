/*
 *
 * SettingsEditActivity
 *
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { activitySelector, loadingSelector, errorSelector } from './selectors';
import messages from './messages';

import { loadActivity } from './actions';
import { updateActivity } from 'common/actions';
import ActivityForm from 'components/ActivityForm';
import Loading from 'components/Loading';

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
    const { activity, loading, error } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <ActivityForm
          onSubmit={this._handleSubmit}
          initialValues={activity}
          activityId={activity && activity.get('id')}
          error={error} />
        { loading && <Loading />}
      </div>
    );
  }
}

SettingsEditActivity.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  activity: activitySelector(),
  loading: loadingSelector(),
  error: errorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadActivity: (activityId) => dispatch(loadActivity(activityId)),
    updateActivity: (activity) => dispatch(updateActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditActivity);
