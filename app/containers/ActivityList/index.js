/*
 *
 * ActivityList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivities } from './selectors';
import messages from './messages';
import { loadActivities } from './actions';

export class ActivityList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.doLoadActivities();
  }

  render() {
    return (
      <div>
        <Helmet
          title="ActivityList"
          meta={[
            { name: 'description', content: 'Description of ActivityList' },
          ]}
        />
        {this.props.children}
      </div>
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
