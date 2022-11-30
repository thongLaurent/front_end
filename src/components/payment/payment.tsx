import React from "react";
import Link from "next/link";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import GetAppIcon from "@material-ui/icons/GetApp";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  PaymentWrapper,
  // OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
  PaymentContainer,
  PaymentInfoText,
  PaymentSecondContainer,
} from "./payment.style";
import { FormattedMessage } from "react-intl";
import { useCart } from "contexts/cart/use-cart";

type OrderReceivedProps = {};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {
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
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const classes = useStyles();
  return (
    <PaymentWrapper>
      <PaymentContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link>

        <PaymentInfoText>
          <BlockTitle>
            <FormattedMessage
              id="trackingInfoText"
              defaultMessage="Payment Page"
            />
          </BlockTitle>
        </PaymentInfoText>
      </PaymentContainer>
      <PaymentSecondContainer>
        <button>Pay</button>
      </PaymentSecondContainer>
    </PaymentWrapper>
  );
};

export default OrderReceived;
