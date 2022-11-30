import React, { useContext, useState } from 'react';
import {
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  // Input,
  Button,
  LinkButton,
  Offer,
  ErrorSpan,
  MainError,
} from './authentication-form.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from 'contexts/auth/auth.context';
import { Input } from 'components/forms/input';
import { validateEmail } from 'utils/util-functions';
import { Auth } from 'services/auth';

export default function ForgotPasswordModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [emailAddress, setEmailAddress]= useState(null);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState(null);

  const [isResetSent, setResetLinkSent] = useState(false);
  const intl = useIntl();
  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    const trimmedValue = value.trim() ? value.trim(): '';
    setEmailAddress(trimmedValue);
    if (validateEmail(trimmedValue)) {
      setInvalidEmail(false);
      setFormValid(true);    
    } else {
      setInvalidEmail(true);
      setFormValid(false);
    }
  }

  const handleOnFocus = (e) => {
    setError(null);
  }

  const handleResetButtonClick = () => {
    if (isFormValid) {
      setLoading(true);
      Auth.resetPassword({
        email: emailAddress
      }).then((response) => {
        if (response.status == 200) {
          setResetLinkSent(true);
        }
        setLoading(false);
      }).catch((error) => {
        if (error.response && error.response?.data?.status_message) {
          setError(error.response?.data?.status_message);
        }
        setLoading(false);
      })
    }
  }

  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>
          <FormattedMessage
            id='forgotPassText'
            defaultMessage='Forgot Password'
          />
        </Heading>
        {isResetSent ? <SubHeading>
          <FormattedMessage id='resetEmailSent' />
        </SubHeading>
        : 
        <><SubHeading>
          <FormattedMessage
            id='sendResetPassText'
            defaultMessage="We'll send you a link to reset your password"
          />
        </SubHeading>
        {error ? <MainError>{error}</MainError>: null}
        <div style={{
          position: `relative`
        }}>
          <Input
            type='text'
            placeholder={intl.formatMessage({
              id: 'emailAddressPlaceholder',
              defaultMessage: 'Email Address',
            })}
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
            value={emailAddress}
            onChange={handleOnChange}
            onBlur={handleOnChange}
            onFocus={handleOnFocus}
          />
            {invalidEmail ? <ErrorSpan>Invalid email address</ErrorSpan> : null}
        </div>
        <Button
          variant='primary'
          size='big'
          style={{ width: '100%' }}
          type='submit'
          onClick={handleResetButtonClick}
          disabled={!isFormValid}
          loading={loading}
        >
          <FormattedMessage
            id='resetPasswordBtn'
            defaultMessage='Reset Password'
          />
        </Button>
        </>
        }
        <Offer style={{ padding: '20px 0 0' }}>
          <FormattedMessage id='backToSign' defaultMessage='Back to' />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
