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

    this.state = {selectedActivityId: 0, deleteActivity: null};
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
            <ActivityList 
              activities={activities}
              onDelete={this._handleDelete}/>
          </LayoutChild>
          <LayoutChild>
            {this.props.children}
          </LayoutChild>
        </LayoutParent>
        {this.state.deleteActivity && (
          <DeleteActivity
            activity={this.state.deleteActivity}
            onOk={this._handleOkDelete}
            onCancel={this._handleCancelDelete}/>
        )}
      </FullScreen>
    );
  }

  _handleDelete = (activity) => {
    console.log('_handleDelete');
    this.setState({deleteActivity: activity});
  }

  _handleOkDelete = () => {
    this.setState({deleteActivity: null});
  }

  _handleCancelDelete = () => {
    this.setState({deleteActivity: null});
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
