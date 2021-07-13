import PropTypes from 'prop-types';
// import Router from 'next/router';
import { useMutation } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { object } from 'yup';
import { password, confirmPassword } from '../../../utils/validation';
import { passResetSuccessful } from '../../../config';
import { RESET_PASSWORD } from '../../../graphql/queries';
import BackBtn from '../../molecules/BackBtn/BackBtn';
import FormInputPass from '../../atoms/FormInputPass/FormInputPass';
import DisplayError from '../../molecules/DisplayError/DisplayError';
import DisplaySuccess from '../../molecules/DisplaySuccess/DisplaySuccess';
import PassReqList from '../../molecules/PassReqList/PassReqList';
import * as sc from './ResetPassword.style';

const validationSchema = object().shape(password, confirmPassword);

const ResetPassword = props => {
  // handleCompleted = () => Router.push({ pathname: '/' });

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD,
    {
      // onCompleted() {
      //   handleCompleted();
      // },

      onError(_error) {}
    }
  );

  const onSubmit = (values, formikHelpers) => {
    resetPassword({ variables: { ...values, resetToken: props.resetToken } });

    formikHelpers.resetForm();
  };

  if (!error && data && data.resetPassword)
    return (
      <>
        <BackBtn path='/welcome' />

        <DisplaySuccess message={passResetSuccessful} />
      </>
    );

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <sc.FormikFormm>
          <FormInputPass
            label='New password'
            id='resetPasswordPassword'
            name='password'
          />

          <FormInputPass
            label='Confirm new password'
            id='resetPasswordConfirmPassword'
            name='confirmPassword'
          />

          {error && <DisplayError error={error} />}

          <PassReqList />

          <sc.FormItemBtn>
            <sc.SubmitBtn
              aria-label='reset password'
              type='primary'
              htmlType='submit'
              loading={loading}
              disabled={
                !!(
                  !formikProps.values.password ||
                  !formikProps.values.confirmPassword ||
                  formikProps.errors.password ||
                  formikProps.errors.confirmPassword ||
                  formikProps.isSubmitting
                )
              }
            >
              Reset
            </sc.SubmitBtn>
          </sc.FormItemBtn>
        </sc.FormikFormm>
      )}
    </Formik>
  );
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired
};

export default React.memo(ResetPassword);
