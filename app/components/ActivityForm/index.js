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
import { 
  RaisedButton,
  MenuItem,
} from 'material-ui';
import { 
  TextField,
  SelectField,
} from 'redux-form-material-ui';

class ActivityForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Field fullWidth={true} name='name' component={TextField} type='text' label='Activity name' />
          </div>
          <div>
            <Field fullWidth={true} name='type' component={SelectField} hintText='Select a type'>
              <MenuItem value='iterable' primaryText='Recurrent'/>
              <MenuItem value='continuous' primaryText='Continuous'/>
            </Field>
          </div>
          <div>
            <Field fullWidth={true} name='priority' component={TextField} type='number' label='Activity priority' />
          </div>
          <div>
            <RaisedButton type='submit' label='Create activity' />
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
