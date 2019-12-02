import PropTypes from 'prop-types';
// import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import DisplayError from '../DisplayError/DisplayError';
import DisplaySuccess from '../DisplaySuccess/DisplaySuccess';
import { RESET_PASSWORD } from '../../graphql/queries';
import { passwordRequirements } from '../../constants';
import * as sc from './ResetPassword.style';

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(255, 'Must be 255 characters or less')
    .required('Required'),

  confirmPassword: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(255, 'Must be 255 characters or less')
    .required('Required')
});

const ResetPassword = props => {
  const { resetToken, resetTokenExpiry } = props;

  // handleCompleted = () => Router.push({ pathname: '/' });

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD,
    {
      // onCompleted() {
      //   handleCompleted();
      // },
      onError(_err) {}
    }
  );

  const handleSubmitForm = (values, formikHelpers) => {
    resetPassword({ variables: { ...values, resetToken: props.resetToken } });

    formikHelpers.resetForm();
  };

  const isTokenPresent = resetToken && resetTokenExpiry;
  const isTokenExpired = Date.now() > resetTokenExpiry;
  const isTokenValid = isTokenPresent && !isTokenExpired;

  const tokenMissingError = {
    message: 'Error: Please submit a new password reset request.'
  };
  const tokenExpiredError = {
    message: 'Your reset request is expired.  Please submit a new one.'
  };

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmitForm}
    >
      {formikProps => (
        <sc.ResetPassword>
          <Field name='password'>
            {fieldProps => (
              <sc.FormItem
                label='New password'
                htmlFor='resetPasswordPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputPassword
                  id='resetPasswordPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='lock' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          <Field name='confirmPassword'>
            {fieldProps => (
              <sc.FormItem
                label='Confirm new password'
                htmlFor='resetPasswordConfirmPassword'
                help={fieldProps.meta.touched && fieldProps.meta.error}
                validateStatus={
                  fieldProps.meta.touched && fieldProps.meta.error
                    ? 'error'
                    : ''
                }
              >
                <sc.InputPassword
                  id='resetPasswordConfirmPassword'
                  onPressEnter={fieldProps.handleSubmit}
                  prefix={<sc.InputIcon type='lock' />}
                  {...fieldProps.field}
                />
              </sc.FormItem>
            )}
          </Field>

          {!isTokenPresent && <DisplayError error={tokenMissingError} />}

          {isTokenPresent && isTokenExpired && (
            <DisplayError error={tokenExpiredError} />
          )}

          {isTokenValid && error && <DisplayError error={error} />}

          {data && data.resetPassword && (
            <DisplaySuccess message='Your password has been successfully changed.' />
          )}

          <sc.PassListContainer>
            <sc.TypographyText strong>
              {passwordRequirements.title}
            </sc.TypographyText>

            <sc.PassList
              split={false}
              dataSource={passwordRequirements.reqs}
              renderItem={item => (
                <sc.PassListItem>
                  <sc.ListIcon type='minus' />

                  <sc.TypographyText>{item}</sc.TypographyText>
                </sc.PassListItem>
              )}
            />
          </sc.PassListContainer>

          <sc.FormItemBtn>
            <sc.SubmitBtn
              loading={loading}
              type='primary'
              htmlType='submit'
              disabled={
                !formikProps.values.password ||
                !formikProps.values.confirmPassword ||
                formikProps.errors.password ||
                formikProps.errors.confirmPassword ||
                formikProps.isSubmitting
              }
            >
              Submit
            </sc.SubmitBtn>
          </sc.FormItemBtn>
        </sc.ResetPassword>
      )}
    </Formik>
  );
};

ResetPassword.defaultProps = { resetToken: '', resetTokenExpiry: '' };

ResetPassword.propTypes = {
  resetToken: PropTypes.string,
  resetTokenExpiry: PropTypes.string
};

export default React.memo(ResetPassword);
