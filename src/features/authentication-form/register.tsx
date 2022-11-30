import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from 'components/forms/input';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  ReferralSuccessSpan,
  ErrorReferralSpan,
  ErrorSpan,
  MainError,
  // Input,
  Divider,
  LinkButton,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { Auth } from 'services/auth';
import { validateEmail } from 'utils/util-functions';

export default function SignOutModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);

  const [ isReferralVerfied , setReferralVerfied] = useState(false);
  const [referredByName, setReferredByName] = useState('');
  const [isReferralIdFound, setIsReferralIdFound] = useState(false);
  const [referralError, setReferralError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    referralCode: ''
  });

  const [errorValues, setErrorValues] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    referralCode: null
  });

  const [buttonValues, setButtonValues] = useState({
    verifyReferral: 'Verify',
    register: 'Continue'
  })

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };
 
  useEffect(() => {
    validateForm();
  }, [isReferralIdFound, isReferralVerfied, values])

  const handleOnFocus = (e) => {
    if (registrationError !== null) {
      setRegistrationError(null);
    }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    if (name === 'referralCode' && isReferralVerfied) {
      setButtonValues({...buttonValues, verifyReferral: 'Verify'})
      setReferralVerfied(false);
    }
    let updatedValue = '';
    if (name !== 'password')
      updatedValue = value.trim() ? value.trim(): '';
    else 
      updatedValue = value;
    setValues({...values, [name]: updatedValue});
    // setErrorValues({...errorValues, [name]: null});
    
    validateData(name, updatedValue);
  }

  const validateData = (name, value) => {

    switch(name) {
      case 'firstName': 
        if (value.length === 0) {
          setErrorValues({...errorValues, [name]: 'First name empty' });
        } else {
          setErrorValues({...errorValues, [name]: null });
        }
      break;

      case 'lastName':
        if (value.length === 0) {
          setErrorValues({...errorValues, [name]: 'Last name empty' });
        } else {
          setErrorValues({...errorValues, [name]: null });
        }
      break;

      case 'email':
        if (value.length === 0) {
          setErrorValues({...errorValues, [name]: 'Email empty' });
        } else {
          if (!validateEmail(value)) {
            setErrorValues({...errorValues, [name]: 'Invalid email address' });
          } else {
            setErrorValues({...errorValues, [name]: null });
          }
        }
      break;

      case 'password':
        if (value.length === 0) {
          setErrorValues({...errorValues, [name]: 'password empty' });
        } else { 
            setErrorValues({...errorValues, [name]: null });
        }
      break;

      case 'referralCode':
        if (value.length === 0) {
          setErrorValues({...errorValues, [name]: 'Referral code empty' });
        } else { 
            setErrorValues({...errorValues, [name]: null });
        }
        setIsReferralIdFound(false);
      break;
    }
    
    validateForm();
  };

  const validateForm = () => {
    let isvalid = true;
    if (!isReferralIdFound) {
      isvalid = false;
      setIsFormValid(isvalid);
      return;
    }
    
    Object.keys(errorValues).forEach((error) => {
      if (errorValues[error] !== null)  isvalid = false;  
    });

    if (!isvalid) {
      setIsFormValid(isvalid);
      return;
    } 

    Object.keys(values).forEach((value) => {
      console.log(values[value].length)
      if (values[value].length === 0) {
        isvalid = false;
      }
    });

    setIsFormValid(isvalid);
  }
  const signupCallback = (event) => {

    if (isFormValid) {
      setLoading(true);
    }
    Auth.register(values).then((response) => {
      if (response.status == 200) {
        setRegistrationCompleted(true);
      }
    }).catch((reason) => {
      if (reason.response && reason.response?.data?.status_message) {
        setRegistrationError(reason.response?.data?.status_message);
      } else {
        setRegistrationError('Something went wrong. Please try again.');
      }
      setLoading(false);
    })
    event.preventDefault();
  };

  const verifyReferralCode = () => {
    setButtonValues({...buttonValues, verifyReferral: 'wait...'});

    Auth.verifyReferral(values.referralCode).then((response) => {
      if (response.status == 200) {
          setReferralVerfied(true);
          setReferredByName(response.data.data.firstName);
          setIsReferralIdFound(true);
          setButtonValues({...buttonValues, verifyReferral: 'Verified'});
      } else {
        setIsReferralIdFound(false);
      }
    }).catch((error) => {
      if (error.response && error.response?.data?.status_message) {
          setReferralVerfied(true);
          setIsReferralIdFound(false);
          setReferralError(error?.response?.data?.status_message);
          setButtonValues({...buttonValues, verifyReferral: 'verify'});
        }  else {

        setReferralVerfied(false);
        setIsReferralIdFound(false);
        setButtonValues({...buttonValues, verifyReferral: 'verify'});
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>
        { registrationCompleted ? <SubHeading> 
          <FormattedMessage id='registrationSuccess' />
        </SubHeading>
        : <><SubHeading>
          <FormattedMessage
            id='signUpText'
            defaultMessage='Every fill is required in sign up'
          /> </SubHeading>
        
        <form  onSubmit={signupCallback}>
          <div style={{
          position: `relative`
        }}>
          
        {registrationError ?  <div style={{
            position: `relative`
          }}><MainError>{registrationError}</MainError></div>: null }
        <Input
          type='text'
          placeholder={intl.formatMessage({
            id: 'firstNamePlaceholder',
            defaultMessage: 'First name',
          })}
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
          onChange={handleInputChange} onFocus={handleOnFocus} onBlur={handleInputChange}
          value={values.firstName}
          name='firstName'
        />
        {errorValues.firstName ? <ErrorSpan>{errorValues.firstName}</ErrorSpan> : null}
        </div>
        <div style={{
          position: `relative`
        }}>
          <Input
            type='text'
            placeholder={intl.formatMessage({
              id: 'lastNamePlaceholder',
              defaultMessage: 'Last name',
            })}
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
            onChange={handleInputChange} onFocus={handleOnFocus} onBlur={handleInputChange}
            value={values.lastName}
            name='lastName'
          />
          {errorValues.lastName ? <ErrorSpan>{errorValues.lastName}</ErrorSpan> : null}
          <Input
            type='text'
            placeholder={intl.formatMessage({
              id: 'emailAddressPlaceholder',
              defaultMessage: 'Email Address or Contact No.',
            })}
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
            onChange={handleInputChange} onFocus={handleOnFocus} onBlur={handleInputChange}
            value={values.email}
            name='email'
          />
          {errorValues.email ? <ErrorSpan>{errorValues.email}</ErrorSpan> : null}
        </div>
        <div style={{
          position: `relative`
        }}>
          <Input
            type='password'
            placeholder={intl.formatMessage({
              id: 'passwordPlaceholder',
              defaultMessage: 'Password (min 6 characters)',
            })}
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
            onChange={handleInputChange} onFocus={handleOnFocus} onBlur={handleInputChange}
            value={values.password}
            name='password'
          />
          {errorValues.password ? <ErrorSpan>{errorValues.password}</ErrorSpan> : null}
         
          </div>
          <div style={{
            position: `relative`
          }}>
         <Input
          type='text'
          placeholder={intl.formatMessage({
            id: 'referralCodePlaceholder',
            defaultMessage: 'Referral Code',
          })}
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
          onChange={handleInputChange} onFocus={handleOnFocus} onBlur={handleInputChange}
          value={values.referralCode}
          name='referralCode'
        />
        { 
          isReferralVerfied && isReferralIdFound ? null: <Button variant='primary' style={{
              position: `absolute`,
              top: `5px`,
              right: `5px`
          }}  type="button" onClick={verifyReferralCode}>
            <FormattedMessage id={buttonValues.verifyReferral} defaultMessage={buttonValues.verifyReferral} />
          </Button>
        } 
        </div>
        <div>
        {errorValues.referralCode ? <ErrorReferralSpan>{errorValues.referralCode}</ErrorReferralSpan> : null}
        {
          isReferralVerfied ?  isReferralIdFound ? 
          <ReferralSuccessSpan>Referred by {referredByName}.</ReferralSuccessSpan> : <ErrorReferralSpan>{referralError}</ErrorReferralSpan> : null
        }
        </div>
        <HelperText style={{ padding: '20px 0 30px' }}>
          <FormattedMessage
            id='signUpText'
            defaultMessage="By signing up, you agree to offercart's"
          />
          &nbsp;
          <Link href='/'>
            <a>
              <FormattedMessage
                id='termsConditionText'
                defaultMessage='Terms &amp; Condition'
              />
            </a>
          </Link>
        </HelperText>
        
        <Button variant='primary' loading={loading} disabled={!isFormValid} size='big' width='100%' type='submit'>
          <FormattedMessage id={buttonValues.register} defaultMessage={buttonValues.register} />
        </Button>
        </form>
        </>
        }
        {/* <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>
        <Button
          variant='primary'
          size='big'
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id='continueFacebookBtn'
            defaultMessage='Continue with Facebook'
          />
        </Button>
        <Button
          variant='primary'
          size='big'
          style={{ width: '100%', backgroundColor: '#4285f4' }}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id='continueGoogleBtn'
            defaultMessage='Continue with Google'
          />
        </Button> */}
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
