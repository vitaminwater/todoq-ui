/*
 *
 * SettingsNewActivity
 *
 */

import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { createdSelector, loadingSelector, errorSelector } from './selectors';
import messages from './messages';

import { createActivity } from 'common/actions';
import ActivityForm from 'components/ActivityForm';
import Loading from 'components/Loading';

const DEFAULT_VALUES = fromJS({
  type: 'frequency',
  frequency: 'week',
  invest: 120,
  skippable: true,
  avgDuration: 60
});

export class SettingsNewActivity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  _handleSubmit = (activity) => {
    this.props.createActivity(activity);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.created != nextProps.created) {
      this.props.router.push(`/settings/activity/${nextProps.created}/edit`);
    }
  }

  render() {
    const { loading, error } = this.props;
    return (
      <div>
        <ActivityForm
          initialValues={DEFAULT_VALUES}
          onSubmit={this._handleSubmit}
          error={error} />
        {loading && <Loading />}
      </div>
    );
  }
}

SettingsNewActivity.propTypes = {
  createActivity: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  created: createdSelector(),
  loading: loadingSelector(),
  error: errorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    createActivity: (activity) => dispatch(createActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNewActivity);
