import _ from 'lodash';

import styled from 'styled-components';
import React from 'react';
import moment from 'moment';

export const Input = styled.input`
  height: 50px;
  width: 100%;
  border: 2px dashed #E0E0E0;
  padding-left: 10px;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;

  &:focus { outline:none; }
`;

export class InputForm extends React.PureComponent {

  render() {
    const { onChange, value } = this.props.input;
    const { label, placeholder } = this.props;
    return (
      <div>
        <label>{label}</label>
        <Input placeholder={placeholder} onChange={this.props.input.onChange} value={this.props.input.value}/>
      </div>
    );
  }

}

export const TextArea = styled.textarea`
  height: 110px;
  width: 100%;
  border: 2px dashed #E0E0E0;
  padding: 10px;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;

  &:focus { outline:none; }
`;

export class TextAreaForm extends React.PureComponent {

  render() {
    const { onChange, value } = this.props.input;
    const { placeholder } = this.props;
    return (
      <div>
        <label>{this.props.label}</label>
        <TextArea placeholder={placeholder} onChange={this.props.input.onChange} value={this.props.input.value}/>
      </div>
    );
  }

}

export const Select = styled.select`
  height: 50px;
  width: 100%;
  border: 2px solid #E0E0E0;
  border-radius: 0;
  padding: 10px;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;

  &:focus { outline:none; }
`;

export class SelectForm extends React.PureComponent {

  render() {
    const { onChange, value } = this.props.input;
    const { label } = this.props;
    return (
      <div>
        <label>{label}</label>
        <Select onChange={this.props.input.onChange} value={this.props.input.value}>
          {this.props.children}
        </Select>
      </div>
    );
  }

}

const InlineDiv = styled.div`
  display: inline;
  cursor: pointer;
`;

const Checkbox = styled.div`
  display: inline-block;
  border: 2px solid #979797;
  background-color: ${props => props.checked ? '#D8D8D8' : 'white'};
  width: 10pt;
  height: 10pt;
`;

export class RadioForm extends React.PureComponent {

  render() {
    const { onChange, value } = this.props.input;
    const { options, label } = this.props;
    return (
      <div>
        { label && <label>{label}<br /></label> }
        {_.map(options, (option, i) => (
          <InlineDiv key={i} onClick={() => onChange(option.value)}>
            <Checkbox checked={value === option.value} />&nbsp;
            {option.label}&nbsp;&nbsp;
          </InlineDiv>
        ))}
      </div>
    );
  }

}

const Inline30Div = styled.div`
  display: inline-block;
  width: 30%;
`;

export class DateForm extends React.PureComponent {

  render() {
    const { value } = this.props.input;
    const m = moment(value, 'YYYY-MM-DDTHH:mm:ss');
    const day = m.date(),
          month = m.month(),
          year = m.year();
    return (
      <div>
        <Inline30Div>
          <label>Day</label>
          <Select onChange={this._handleDayChange} value={day}>
            {_.times(moment().year(year).month(month).daysInMonth(), (i) => (
              <option key={i}>{i+1}</option>
            ))}
          </Select>
        </Inline30Div>&nbsp;
        <Inline30Div>
          <label>Month</label>
          <Select onChange={this._handleMonthChange} value={month}>
            {_.times(12, (i) => (
              <option value={i} key={i}>{moment().month(i).format('MMMM')}</option>
            ))}
          </Select>
        </Inline30Div>&nbsp;
        <Inline30Div>
          <label>Year</label>
          <Select onChange={this._handleYearChange} value={year}>
            {_.times(4, (i) => (
              <option key={i}>{i+2017}</option>
            ))}
          </Select>
        </Inline30Div>
      </div>
    );
  }

  _handleDayChange = ({ target: { value: day } }) => {
    const { onChange, value } = this.props.input;
    onChange(moment(value).date(day).format('YYYY-MM-DDTHH:mm:ss'));
  }

  _handleMonthChange = ({ target: { value: month } }) => {
    const { onChange, value } = this.props.input;
    onChange(moment(value).month(month).format('YYYY-MM-DDTHH:mm:ss'));
  }

  _handleYearChange = ({ target: { value: year } }) => {
    const { onChange, value } = this.props.input;
    onChange(moment(value).year(year).format('YYYY-MM-DDTHH:mm:ss'));
  }
}

export const Button = styled.button`
  background-color: #A7CEA7;
  padding: 10pt;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  border: 1pt solid #979797;
  cursor: pointer;
`;

export const ButtonCancel = styled.button`
  background-color: #CEA7A7;
  padding: 10pt;
  font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 200;
  border: 1pt solid #979797;
  cursor: pointer;
`;

const ColorDiv = styled.div`
  display: inline-block;
  border: 2px solid ${props => props.checked ? 'black' : '#979797'};
  background-color: ${props => props.color};
  width: 15pt;
  height: 15pt;
  margin-right: 5pt;
  cursor: pointer;
`;

const COLORS = ['#BCD5E1', '#D2EADB', '#CFC2DC', '#EDEEDA', '#BAEBF1'];
export class ColorPicker extends React.PureComponent {

  render() {
    const { onChange, value } = this.props.input;
    return (
      <div>
        <label>Color :</label><br />
        {_.map(COLORS, (color) => (
          <ColorDiv key={color} color={color} onClick={() => onChange(color)} checked={color == value} />
        ))}
      </div>
    );
  }

}

const RelativeDiv = styled.div`
  position: relative;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:focus { outline:none; }
`;

const IconImg = styled.img`
  display: block;
  width: 50pt;
  height: 50pt;
  border: none;
`;

const IconLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 0.9em;
`;

export class IconUpload extends React.PureComponent {

  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this._setUrlFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setUrlFromProps(nextProps);
  }

  render() {
    const { onChange, value } = this.props.input;
    return (
      <RelativeDiv>
        <HiddenFileInput type='file' name='upload' onChange={(e) => onChange(e.target.files[0])} />
        <IconLabel>
          <IconImg src={this.state.url} />  
          Change<br />Icon
        </IconLabel>
      </RelativeDiv>
    );
  }

  _setUrlFromProps(props) {
    if (typeof props.input.value === 'string') {
      this.setState({url: `http://localhost:8000${props.input.value}`});
    }
  }

}
