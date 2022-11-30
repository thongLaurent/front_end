import React, { useContext, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { Button } from "components/button/button";
import RadioCard from "components/radio-card/radio-card";
import RadioGroup from "components/radio-group/radio-group";
import PaymentGroup from "components/payment-group/payment-group";
import UpdateAddress from "components/address-card/address-card";
import UpdateContact from "components/contact-card/contact-card";
// import StripePaymentForm from 'features/payment/stripe-form';
// import { DELETE_ADDRESS } from 'graphql/mutation/address';
// import { DELETE_CARD } from 'graphql/mutation/card';
// import { DELETE_CONTACT } from 'graphql/mutation/contact';
import { CURRENCY } from "utils/constant";
import { openModal } from "@redq/reuse-modal";
// import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from "react-custom-scrollbars";
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  Heading,
  ButtonGroup,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  // Input,
  CouponCode,
  RemoveCoupon,
  ErrorMsg,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
  IconWrapper,
} from "./checkout-two.style";
import CouponBox from "components/coupon-box/coupon-box";

import { Plus } from "assets/icons/PlusMinus";
import { NoCartBag } from "assets/icons/NoCartBag";

import Sticky from "react-stickynode";
import { ProfileContext } from "contexts/profile/profile.context";
import { FormattedMessage } from "react-intl";
import { useCart } from "contexts/cart/use-cart";
// import { APPLY_COUPON } from 'graphql/mutation/coupon';
import { useLocale } from "contexts/language/language.provider";
import { useWindowSize } from "utils/useWindowSize";
import { Input } from "components/forms/input";
import MaskedInput from "react-text-mask";
import { StyledInput } from "components/search-box/search-box.style";
import axios from "axios";
import { API_URL } from "./../../../config/api";
import { apiCalls } from "config/apicalls";
import logo from "assets/images/logo.png";
// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, name, netQuantity, finalPrice, sellingPrice } = product;
  const displayPrice = sellingPrice ? sellingPrice : finalPrice;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : name} {netQuantity ? `| ${netQuantity}` : ""}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setError] = useState("");
  const { profileState, profileDispatch } = useContext(ProfileContext);
  const { isRtl } = useLocale();
  const {
    items,
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    checkOutTotalPrice,
    calculategetCheckoutTotalPrice,
    isRestaurant,
    toggleRestaurant,
    checkoutItems,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [address, selectAddress] = useState({});
  const [contact, handleContact] = useState();
  const [isCheckOut, handleCheckOut] = useState(false);
  const [orderResponse, handleOrder] = useState({});
  // const { address, contact } = state;
  const { addressList } = profileState;

  // const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  // const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  // const [deletePaymentCardMutation] = useMutation(DELETE_CARD);
  // const [appliedCoupon] = useMutation(APPLY_COUPON);
  const size = useWindowSize();

  const handleSubmit = async () => {
    setLoading(true);
    if (isValid) {
      // clearCart();{cart was cleared}
      Router.push("/order-received");
    }
    setLoading(false);
  };
  const checkOut = async () => {
    setLoading(true);
    let body = {
      addressId: address && address["id"] ? address["id"] : "",
      paymentType: "ONLINE",
    };
    let token = localStorage.getItem("access_token");
    axios
      .post(`${API_URL}${apiCalls.createTransaction}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("resssss", res);
      });
    console.log("address", body);
    setLoading(false);
  };
  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0
      // && ddressList.length
    ) {
      setIsValid(true);
      if (addressList) {
        selectAddress(addressList[0]);
      }
    }
  }, [profileState]);
  useEffect(() => {
    if (checkoutItems && checkoutItems.length == 0) {
      Router.push("/");
    }
    console.log("check out items", checkoutItems);
    return () => {
      if (isRestaurant) {
        toggleRestaurant();
        clearCart();
      }
    };
  }, []);
  // Add or edit modal
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal"
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      withRnd: true,
      closeOnClickOutside: false,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleEditDelete = async (item: any, type: string, name: string) => {
    console.log("abc", item);
    if (type === "edit") {
      const modalComponent = name === "address" ? UpdateAddress : UpdateContact;
      handleModal(modalComponent, item);
    } else {
      switch (name) {
        // case 'payment':
        //   dispatch({ type: 'DELETE_CARD', payload: item.id });

        //   return await deletePaymentCardMutation({
        //     variables: { cardId: JSON.stringify(item.id) },
        //   });
        // case 'contact':
        //   dispatch({ type: 'DELETE_CONTACT', payload: item.id });

        //   return await deleteContactMutation({
        //     variables: { contactId: JSON.stringify(item.id) },
        //   });
        // case 'address':
        //   dispatch({ type: 'DELETE_ADDRESS', payload: item.id });

        //   return await deleteAddressMutation({
        //     variables: { addressId: JSON.stringify(item.id) },
        //   });
        default:
          return false;
      }
    }
  };

  const handleApplyCoupon = async () => {
    // const { data }: any = await appliedCoupon({
    //   variables: { code: couponCode },
    // });
    // if (data.applyCoupon && data.applyCoupon.discountInPercent) {
    //   applyCoupon(data.applyCoupon);
    //   setCouponCode('');
    // } else {
    //   setError('Invalid Coupon');
    // }
  };
  const handleOnUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCouponCode(e.currentTarget.value);
  };

  //razor pay
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    let token = localStorage.getItem("access_token");
    let result;
    axios
      .post(
        `${API_URL}cart/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      });
    console.log("result", result);
    // await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
      alert("Server error. Are you online?");
      // return;
    }

    // const { amount, id: order_id, currency } = result.data;
    let amount = 200;
    let order_id = "id";
    let currency = "USD";
    const options = {
      key: "rzp_test_JZtcavyXd2QOWe", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        console.log("-------rrreeeessssssss------", response);
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    // const paymentObject = new Razorpay(options);
    // paymentObject.open();
  }

  console.log("----xxyyyyxzzzzz-----", checkoutItems);
  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id="checkoutDeliveryAddress"
                  defaultMessage="Delivery Address"
                />
              </Heading>
              <ButtonGroup>
                <RadioGroup
                  items={addressList}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.type}
                      content={`
                      ${item.addressLine1},
                      ${item.addressLine2},
                      ${item.district},
                      ${item.state},
                      ${item.pinCode},
                      ${item.country}. `}
                      name="address"
                      checked={
                        address && address["id"] && address["id"] === item.id
                      }
                      onChange={() => selectAddress(item)}
                      //   // profileDispatch({
                      //   //   type: 'SET_PRIMARY_ADDRESS',
                      //   //   payload: item.id.toString(),
                      //   // })
                      // }
                      onEdit={() => handleEditDelete(item, "edit", "address")}
                      onDelete={() =>
                        handleEditDelete(item, "delete", "address")
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className="addButton"
                      variant="text"
                      type="button"
                      onClick={() =>
                        handleModal(UpdateAddress, "add-address-modal")
                      }
                    >
                      <IconWrapper>
                        <Plus width="10px" />
                      </IconWrapper>
                      <FormattedMessage id="addNew" defaultMessage="Add New" />
                    </Button>
                  }
                />
              </ButtonGroup>
            </InformationBox>

            {/* <InformationBox>
              <Heading>
                <FormattedMessage
                  id="contactNumberText"
                  defaultMessage="Select Your Contact Number"
                />
              </Heading>
              <MaskedInput
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholder="Enter a phone number"
                guide={false}
                value={contact}
                name="number"
                render={(ref: any, props: {}) => (
                  <StyledInput ref={ref} {...props} />
                )}
              />
            </InformationBox> */}
            {/* PaymentOption */}

            <InformationBox
              className="paymentBox"
              style={{ paddingBottom: 30 }}
            >
              <Heading>
                <FormattedMessage
                  id="selectPaymentText"
                  defaultMessage="Select Payment Option"
                />
              </Heading>
              {/* <PaymentGroup
                name='payment'
                deviceType={deviceType}
                items={card}
                onEditDeleteField={(item: any, type: string) =>
                  handleEditDelete(item, type, 'payment')
                }
                onChange={(item: any) =>
                  dispatch({
                    type: 'SET_PRIMARY_CARD',
                    payload: item.id.toString(),
                  })
                }
                handleAddNewCard={() => {
                  handleModal(
                    StripePaymentForm,
                    { totalPrice: calculatePrice() },
                    'add-address-modal stripe-modal'
                  );
                }}
              /> */}

              {/* Coupon start */}
              {/* {coupon ? (
                <CouponBoxWrapper>
                  <CouponCode>
                    <FormattedMessage id='couponApplied' />
                    <span>{coupon.code}</span>

                    <RemoveCoupon
                      onClick={(e) => {
                        e.preventDefault();
                        removeCoupon();
                        setHasCoupon(false);
                      }}
                    >
                      <FormattedMessage id='removeCoupon' />
                    </RemoveCoupon>
                  </CouponCode>
                </CouponBoxWrapper>
              ) : (
                <CouponBoxWrapper>
                  {!hasCoupon ? (
                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                      <FormattedMessage
                        id='specialCode'
                        defaultMessage='Have a special code?'
                      />
                    </HaveCoupon>
                  ) : (
                    <>
                      <CouponInputBox>
                        <CouponBox
                          onClick={handleApplyCoupon}
                          value={couponCode}
                          onChange={handleOnUpdate}
                          className='normalCoupon'
                        />
                      </CouponInputBox>

                      {couponError && (
                        <ErrorMsg>
                          <FormattedMessage
                            id='couponError'
                            defaultMessage={couponError}
                          />
                        </ErrorMsg>
                      )}
                    </>
                  )}
                </CouponBoxWrapper>
              )} */}

              <TermConditionText>
                <FormattedMessage
                  id="termAndConditionHelper"
                  defaultMessage="By making this purchase you agree to our"
                />
                <Link href="#">
                  <TermConditionLink>
                    <FormattedMessage
                      id="termAndCondition"
                      defaultMessage="terms and conditions."
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}
              <CheckoutSubmit>
                {/* <Button
                  onClick={handleSubmit}
                  type='button'
                  disabled={!isValid}
                  title='Proceed to Checkout'
                  intlButtonId='proceesCheckout'
                  loader={<Loader />}
                  isLoading={loading}
                /> */}

                <Button
                  type="button"
                  onClick={checkOut}
                  disabled={!isValid}
                  size="big"
                  loading={loading}
                  style={{ width: "100%" }}
                >
                  <FormattedMessage
                    id="processCheckout"
                    defaultMessage="Proceed to Checkout"
                  />
                </Button>
              </CheckoutSubmit>
              {/* {isCheckOut && (
                <CheckoutSubmit>
                  <Button
                  onClick={handleSubmit}
                  type='button'
                  disabled={!isValid}
                  title='Proceed to Checkout'
                  intlButtonId='proceesCheckout'
                  loader={<Loader />}
                  isLoading={loading}
                />

                  <Button
                    type="button"
                    onClick={displayRazorpay}
                    disabled={!isValid}
                    size="big"
                    loading={loading}
                    style={{ width: "100%" }}
                  >
                    <FormattedMessage id="pay" defaultMessage="Pay" />
                  </Button>
                </CheckoutSubmit>
              )} */}
            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            {/* <Sticky enabled={true} top={totalHeight} innerZ={999}> */}
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id="cartTitle"
                    defaultMessage="Your Order"
                  />
                </Title>

                <Scrollbars
                  universal
                  autoHide
                  autoHeight
                  autoHeightMax="390px"
                  renderView={(props) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        marginLeft: isRtl ? props.style.marginRight : 0,
                        marginRight: isRtl ? 0 : props.style.marginRight,
                        paddingLeft: isRtl ? 15 : 0,
                        paddingRight: isRtl ? 0 : 15,
                      }}
                    />
                  )}
                >
                  <ItemsWrapper>
                    {checkoutItems.length > 0 ? (
                      checkoutItems.map((item) => (
                        //  console.log("124", item)
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <>
                        <NoProductImg>
                          <NoCartBag />
                        </NoProductImg>

                        <NoProductMsg>
                          <FormattedMessage
                            id="noProductFound"
                            defaultMessage="No products found"
                          />
                        </NoProductMsg>
                      </>
                    )}
                  </ItemsWrapper>
                </Scrollbars>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="subTotal"
                        defaultMessage="Subtotal"
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculategetCheckoutTotalPrice()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="intlOrderDetailsDelivery"
                        defaultMessage="Delivery Fee"
                      />
                    </Text>
                    <Text>{CURRENCY}0.00</Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id="discountText"
                        defaultMessage="Discount"
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id="totalText" defaultMessage="Total" />{" "}
                      <Small>
                        (
                        <FormattedMessage
                          id="vatText"
                          defaultMessage="Incl. VAT"
                        />
                        )
                      </Small>
                    </Bold>
                    <Bold>
                      {CURRENCY}
                      {checkOutTotalPrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
