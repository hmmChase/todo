import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'antd';
import InputPass from '../InputPass/InputPass';
// import * as sc from './FormInputPass.style';

const FormInputPass = (props) => (
  <Field name={props.name}>
    {(fieldProps) => (
      <Form.Item
        label={props.label}
        htmlFor={props.id}
        help={fieldProps.meta.touched && fieldProps.meta.error}
        validateStatus={
          fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''
        }
      >
        <InputPass
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

FormInputPass.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default React.memo(FormInputPass);
