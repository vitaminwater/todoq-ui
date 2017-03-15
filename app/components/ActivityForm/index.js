/**
*
* ActivityForm
*
*/

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Field, reduxForm } from 'redux-form/immutable';

class ActivityForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Field component='input' name='name' type='text' label='Activity name' />
          </div>
        </div>
      </form>
    );
  }
}

ActivityForm.propTypes = {
};

ActivityForm = reduxForm({
  form: 'activityForm',
})(ActivityForm);

export default ActivityForm;
