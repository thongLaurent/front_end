import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { closeModal } from '@redq/reuse-modal';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
import { FieldWrapper, Heading } from './change-password.style';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import Select from 'components/select/select';
import { User } from 'services/user';
import { SubHeading } from 'features/authentication-form/authentication-form.style';


// Shape of form values
interface FormValues {
  confirmPassword: string;
  email: string;
  newPassword: string;
  oldPassword: string;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}
 

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      confirmPassword:  props.item.confirmPassword || '',
      email: props.item.email || null,
      newPassword: props.item.newPassword || '',
      oldPassword: props.item.oldPassword || ''
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required'),
    newPassword: Yup.string().required('Password is required').min(8),
    confirmPassword:  Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').min(8),
    oldPassword: Yup.string().required('Password is required')
  }),
  handleSubmit: (values) => {
    console.log(values, 'values');
    // do submitting things
  },
});

const ChangePassword = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,

    handleReset,
    isSubmitting,
  } = props;
  const changePasswordValue = {
    confirmPassword:  values.confirmPassword || null,
    email: values.email || '',
    newPassword: values.newPassword || null,
    oldPassword: values.oldPassword || null
  };
  const { state, dispatch } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // const [addressMutation, { data }] = useMutation(UPDATE_ADDRESS);

  const handleSubmit = async () => {
    console.log(changePasswordValue)
    if (isValid) {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      User.updatePasssword(changePasswordValue).then((response) => {
        setLoading(false);
        console.log('password updated')
        setPasswordUpdated(true);
      }).catch((error) => {
        setLoading(false);
        console.log(error)
      })
    }
  };
  return (
    passwordUpdated ? <SubHeading>
    <FormattedMessage id='passwordUpdated' />
  </SubHeading> :
    <Form>
      <Heading>Change Password</Heading>
      
      <FieldWrapper>
        <TextField
          id="oldPassword"
          type="password"
          placeholder="Old password"
          error={touched.oldPassword && errors.oldPassword}
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="newPassword"
          type="password"
          placeholder="New password"
          error={touched.newPassword && errors.newPassword}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          error={touched.confirmPassword && errors.confirmPassword}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: '100%', height: '44px' }}
        loading={loading}
      >
        <FormattedMessage id="changePasswordId" defaultMessage="Update Password" />
      </Button>
    </Form>
  );
};

export default FormEnhancer(ChangePassword);
