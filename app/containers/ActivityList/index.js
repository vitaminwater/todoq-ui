/*
 *
 * ActivityList
 *
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivities } from './selectors';
import { loadDayActivities } from './actions';
import messages from './messages';
import { Link } from 'react-router';

import { Header, FullScreen, LayoutParent, LayoutChild } from 'components/UIKit/layout';
import { MenuIcon } from 'components/UIKit/menu';
import NoActivity from 'components/NoActivity';
import Timeline from 'components/Timeline';

import settings from 'common/img/settings.png';

export class ActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

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
          <Link to="/settings"><MenuIcon src={settings} /></Link>
        </Header>
        <LayoutParent>
          <LayoutChild left active={!this.state.selectedActivityId}>
            <Timeline activities={activities} />
          </LayoutChild>
          <LayoutChild>
            {this.props.children || (<NoActivity />)}
          </LayoutChild>
        </LayoutParent>
      </FullScreen>
    );
  }
}

ActivityList.propTypes = {
  doLoadActivities: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLoadActivities: () => dispatch(loadDayActivities()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
