/**
*
* ActivityForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Field, reduxForm, formValueSelector, initialize } from 'redux-form/immutable';
  
import { InputForm, TextAreaForm, SelectForm, RadioForm, DateForm, Button, ColorPicker, IconUpload } from 'components/UIKit/form';

const SmallDiv = styled.div`
  max-width: 100pt;
`;

const InlineDiv = styled.div`
  display: inline-block;
  margin-right: 30pt;
  vertical-align: middle;
`;

const ButtonContainer = styled.div`
  text-align: right;
`;

const Error = styled.span`
  color: red;
`;

class ActivityForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 
  componentWillReceiveProps(nextProps) {
    if (this.props.initialValues != nextProps.initialValues) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  renderType(type) {
    if (type == 'frequency') {
      return (
        <Field component={SelectForm} name='frequency'>
          <option>day</option>
          <option>week</option>
          <option>month</option>
          <option>year</option>
        </Field>
      );
    } else if (type == 'deadline') {
      return (
        <Field component={DateForm} name='deadline' />
      );
    }
  }

  render() {
    const { handleSubmit, initialValues, error } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field component={InputForm} name='name' type='text' label='Name' placeholder='ex: Check emails' /><br />
        <Field component={TextAreaForm} name='why' label='Why do this ?' placeholder='ex: I should start and end my days with an empty inbox.' /><br />
        <InlineDiv>
          <Field component={IconUpload} name='image' label='Change Icon' />
        </InlineDiv>
        <InlineDiv>
          <Field component={ColorPicker} name='color' label='Color' />
        </InlineDiv>
        <hr />
        <Field component={SelectForm} name='invest' label='At least :'>
          <option value={30}>30 min</option>
          {_.times(20, (i) => (
            <option key={i} value={(i+1)*60}>{i+1} hr</option>
          ))}
        </Field><br />
        <Field component={RadioForm} name='type' options={[{
          label: 'Per',
          value: 'frequency',
        },{
          label: 'Until :',
          value: 'deadline',
        },]} />
        { this.renderType(this.props.type) }<br />
        <SmallDiv>
          <Field component={SelectForm} name='avgDuration' label='At least :'>
            {_.times(8, (i) => (
              <option key={i} value={(i+1)*30}>{Math.floor((i+1) / 2)} hr {((i+1) % 2) * 30}</option>
            ))}
          </Field>
        </SmallDiv><br />
        <Field component={RadioForm} name='skippable' options={[{
          label: 'Yes',
          value: true,
        },{
          label: 'No',
          value: false,
        },]} label='This task cannot be skipped when full-focus mode is ON' />
        {error && <Error>{error}</Error>}
        <ButtonContainer>
          <Button>{ initialValues && initialValues.get('id') ? 'UPDATE' : 'CREATE' }</Button>
        </ButtonContainer>
      </form>
    );
  }
}

ActivityForm.propTypes = {
};

ActivityForm = reduxForm({
  form: 'activityForm',
})(ActivityForm);

const selector = formValueSelector('activityForm');
ActivityForm = connect(
  state => {
    const type = selector(state, 'type');
    return {
      type,
    }
  },
  dispatch => ({
    initialize: (initialValues) => dispatch(initialize('activityForm', initialValues)),
  })
)(ActivityForm);

export default ActivityForm;
