import React, { useContext, useState, useEffect } from "react";
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
  ErrorSpan,
  MainError,
} from "./authentication-form.style";
import { Facebook } from "assets/icons/Facebook";
import { Google } from "assets/icons/Google";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage, useIntl } from "react-intl";
import { closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { validateEmail } from "utils/util-functions";
import { Auth } from "services/auth";
import { ProfileContext } from "contexts/profile/profile.context";
import { useCart } from "./../../contexts/cart/use-cart";
export default function SignInModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const { fetchData } = useContext(ProfileContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    role: "USER",
    password: "",
    username: "",
  });
  const [errorValues, setErrorValues] = useState({
    username: null,
    password: null,
  });
  const { rehydrateLocalState } = useCart();
  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const handleOnFocus = () => {
    setLoginError(null);
  };

  // useEffect(() => {
  //   validateForm();
  // }, [values])

  const handleOnChanges = (e) => {
    const { name, value } = e.target;
    let updatedValue = "";
    if (name !== "password") updatedValue = value.trim() ? value.trim() : "";
    else updatedValue = value;

    setValues({ ...values, [name]: updatedValue });
    validateData(name, updatedValue);
  };
  const validateData = (name, updatedValue) => {
    switch (name) {
      case "username":
        if (updatedValue.length === 0) {
          setErrorValues({ ...errorValues, [name]: "Email empty" });
        } else {
          if (!validateEmail(updatedValue)) {
            setErrorValues({ ...errorValues, [name]: "Invalid email address" });
          } else {
            setErrorValues({ ...errorValues, [name]: null });
          }
        }
        break;

      case "password":
        if (updatedValue.length === 0) {
          setErrorValues({ ...errorValues, [name]: "password empty" });
        } else {
          setErrorValues({ ...errorValues, [name]: null });
        }
        break;
    }
    validateForm();
  };

  const validateForm = () => {
    let isvalid = true;
    Object.keys(errorValues).forEach((error) => {
      if (errorValues[error] !== null) isvalid = false;
    });
    setIsFormValid(isvalid);
  };

  const loginCallback = (event) => {
    if (isFormValid) {
      setLoading(true);
      Auth.login(values)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.data.token);
            authDispatch({ type: "SIGNIN_SUCCESS" });
            fetchData();
            rehydrateLocalState({}, "login");
            closeModal();
          }
          setLoading(false);
        })
        .catch((reason) => {
          console.log(reason.response);
          if (reason.response && reason.response?.data?.status_message) {
            setLoginError(reason.response?.data?.status_message);
          } else {
            setLoginError("Something went wrong. Please try again.");
          }
          setLoading(false);
        });
    }
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="loginText"
            defaultMessage="Login with your email &amp; password"
          />
        </SubHeading>
        <form onSubmit={loginCallback}>
          {error ? (
            <div
              style={{
                position: `relative`,
              }}
            >
              <MainError>{error}</MainError>
            </div>
          ) : null}
          <div
            style={{
              position: `relative`,
            }}
          >
            <Input
              type="text"
              placeholder={intl.formatMessage({
                id: "emailAddressPlaceholder",
                defaultMessage: "Email Address.",
              })}
              value={values.username}
              name="username"
              onChange={handleOnChanges}
              onBlur={handleOnChanges}
              onFocus={handleOnFocus}
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            {errorValues.username ? (
              <ErrorSpan>{errorValues.username}</ErrorSpan>
            ) : null}
          </div>
          <div
            style={{
              position: `relative`,
            }}
          >
            <Input
              type="password"
              placeholder={intl.formatMessage({
                id: "passwordPlaceholder",
                defaultMessage: "Password (min 6 characters)",
              })}
              value={values.password}
              onChange={handleOnChanges}
              onBlur={handleOnChanges}
              onFocus={handleOnFocus}
              name="password"
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            {errorValues.password ? (
              <ErrorSpan>{errorValues.password}</ErrorSpan>
            ) : null}
          </div>
          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            type="submit"
            disabled={!isFormValid}
            loading={loading}
          >
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
        </form>
        {/* <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider> */}

        {/* <Button
          variant='primary'
          size='big'
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
          onClick={loginCallback}
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
          onClick={loginCallback}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id='continueGoogleBtn'
            defaultMessage='Continue with Google'
          />
        </Button> */}

        <Offer style={{ padding: "20px 0" }}>
          <FormattedMessage
            id="dontHaveAccount"
            defaultMessage="Don't have any account?"
          />{" "}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id="forgotPasswordText"
            defaultMessage="Forgot your password?"
          />{" "}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id="resetText" defaultMessage="Reset It" />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
