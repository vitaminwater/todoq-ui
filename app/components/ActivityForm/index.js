/**
*
* ActivityForm
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Field, reduxForm } from 'redux-form';

class ActivityForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FormattedMessage {...messages.header} />
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" />
          <button type="submit">Ok</button>
        </div>
      </form>
    );
  }
}

ActivityForm.propTypes = {

};

ActivityForm = reduxForm({
  form: 'activity',
})(ActivityForm);

export default ActivityForm;
