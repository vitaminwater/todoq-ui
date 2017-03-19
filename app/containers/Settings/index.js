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
import { deleteActivity } from 'common/actions';
import messages from './messages';
import { Link } from 'react-router';

import { Header, FullScreen, LayoutParent, LayoutChild } from 'components/UIKit/layout';
import { MenuIcon } from 'components/UIKit/menu';
import ActivityList from 'components/SettingsActivityList';

import DeleteActivity from 'components/DeleteActivity';

import logo from 'common/img/robot.png';
import add from 'common/img/add.png';

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
          <Link to="/"><MenuIcon src={logo} /></Link>
          <Link to="/settings/activity"><MenuIcon src={add} /></Link>&nbsp;
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
    this.setState({deleteActivity: activity});
  }

  _handleOkDelete = () => {
    this.props.deleteActivity(this.state.deleteActivity);
    this.setState({deleteActivity: null});
  }

  _handleCancelDelete = () => {
    this.setState({deleteActivity: null});
  }
}

Settings.propTypes = {
  doLoadActivities: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoadActivities: () => dispatch(loadActivities()),
    deleteActivity: (activity) => dispatch(deleteActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
