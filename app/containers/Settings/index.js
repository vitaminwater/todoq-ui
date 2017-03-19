/*
 *
 * Settings
 *
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivities } from './selectors';
import { loadActivities } from './actions';
import messages from './messages';
import { Link } from 'react-router';

import { Header, FullScreen, LayoutParent, LayoutChild } from 'components/UIKit/layout';
import ActivityList from 'components/SettingsActivityList';

import DeleteActivity from 'components/DeleteActivity';

export class Settings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();

    this.state = {selectedActivityId: 0};
  }

  componentWillMount() {
    this.props.doLoadActivities();
  }

  render() {
    const { activities } = this.props;
    return (
      <FullScreen>
        <Header>
          <Link to="/settings/activity">New activity</Link>&nbsp;
          <Link to="/">Home</Link>
        </Header>
        <LayoutParent>
          <LayoutChild left active={!this.state.selectedActivityId}>
            <ActivityList activities={activities} />
          </LayoutChild>
          <LayoutChild>
            {this.props.children}
          </LayoutChild>
        </LayoutParent>
        {activities && activities.size && <DeleteActivity activity={activities.get(0)} />}
      </FullScreen>
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
