/*
 *
 * ActivityList
 *
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivities } from './selectors';
import messages from './messages';
import { loadActivities } from './actions';
import { media } from '../../style';
import NoActivity from '../../components/NoActivity';

const Header = styled.div`
	height: 50pt;
`;

const FullScreen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
`;

const LayoutParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const LayoutChild = styled.div`
  background-color: blue;
  flex: ${props => props.left ? 0.25 : 0.75};
	z-index: ${props => props.active ? 10 : 0};
	${media.desktop`
	  position: absolute;
		width: 100%; height: 100%;
	`}
`;

export class ActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.doLoadActivities();
  }

  render() {
    return (
      <FullScreen>
        <Helmet
          title="ActivityList"
          meta={[
            { name: 'description', content: 'Description of ActivityList' },
          ]}
        />
				<Header>Header</Header>
        <LayoutParent>
          <LayoutChild left>pouet</LayoutChild>
          <LayoutChild active>
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