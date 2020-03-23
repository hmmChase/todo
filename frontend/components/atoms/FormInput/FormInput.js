import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'antd';
import Input from '../Input/Input';
// import * as sc from './FormInput.style';

const FormInput = props => (
  <Field name={props.name}>
    {fieldProps => (
      <Form.Item
        label={props.label}
        htmlFor={props.id}
        help={fieldProps.meta.touched && fieldProps.meta.error}
        validateStatus={
          fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''
        }
      >
        <Input
          id={props.id}
          name={props.name}
          type={props.type}
          value={fieldProps.field.value}
          onChange={fieldProps.field.onChange}
          onBlur={fieldProps.field.onBlur}
          onPressEnter={fieldProps.form.handleSubmit}
        />
      </Form.Item>
    )}
  </Field>
);

FormInput.propTypes = {
  formikProps: PropTypes.any,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};

export default React.memo(FormInput);
