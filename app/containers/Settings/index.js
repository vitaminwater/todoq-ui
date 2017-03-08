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
import { Header, FullScreen, LayoutParent, LayoutChild } from 'style';
import messages from './messages';
import ActivityList from 'components/SettingsActivityList';

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
				<Header>Header</Header>
        <LayoutParent>
          <LayoutChild left active={!this.state.selectedActivityId}>
            <ActivityList activities={activities} />
          </LayoutChild>
          <LayoutChild>
            {this.props.children}
          </LayoutChild>
        </LayoutParent>
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
