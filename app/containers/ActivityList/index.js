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
import messages from './messages';
import { loadActivities } from './actions';
import { media } from 'style';
import NoActivity from 'components/NoActivity';
import Timeline from 'components/Timeline';

const FullScreen = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
	height: 50pt;
`;

const LayoutParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
`;

const LayoutChild = styled.div`
  flex: ${props => props.left ? 0.25 : 0.75};
	z-index: ${props => props.active ? 10 : 0};
	${media.desktop`
	  position: absolute;
		width: 100%; height: 100%;
	`}
`;

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
				<Header>Header</Header>
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
    doLoadActivities: () => dispatch(loadActivities()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
