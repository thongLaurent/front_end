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
  TrackingWrapper,
  TrackingContainer,
  TrackingInfo,
  Status,
  TrackingFirstRow,
  TrackingCard,
  TrackingSecondRow,
} from "./tracking.style";
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
  console.log("calculatePrice", calculateSubTotalPrice(), calculatePrice());
  return (
    <TrackingWrapper>
      <TrackingContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="trackingInfoText"
              defaultMessage="Tracking Info"
            />
          </BlockTitle>
        </OrderInfo>
        <TrackingFirstRow>
          <TrackingCard>
            <BlockTitle>
              <FormattedMessage
                id="deliveryAddress"
                defaultMessage="Delivery Address"
              />
            </BlockTitle>
            <Typography variant="h6" component="h1">
              Name
            </Typography>
            <Typography variant="h6" component="h1">
              Xxxxx
            </Typography>
            <Typography variant="h6" component="h1">
              Yyyyy
            </Typography>
            <Typography variant="h6" component="h1">
              Zzzzz
            </Typography>
          </TrackingCard>
          <TrackingCard>
            <BlockTitle>
              <FormattedMessage id="youRewards" defaultMessage="Your Rewards" />
            </BlockTitle>
            <Typography variant="h6" component="h1">
              Reward Points - {20}
            </Typography>
          </TrackingCard>
          <TrackingCard>
            <BlockTitle>
              <FormattedMessage
                id="moreActions"
                defaultMessage="More Actions"
              />
            </BlockTitle>
            <Typography variant="h6" component="h1">
              <GetAppIcon className="mt-5" /> Download Invoice
            </Typography>
          </TrackingCard>
          <TrackingCard className="text-center">
            {/* <TrackingInfo>
              <Status> */}
            <BlockTitle className="text-center">
              <FormattedMessage
                id="youRewards"
                defaultMessage="Delivery Status"
              />
            </BlockTitle>
            <Timeline className="d-flex">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">09:30 am</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>Ordered</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">10:00 am</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>Packed</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">12:00 am</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>Shipped</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">9:00 am</Typography>
                </TimelineOppositeContent>
                <TimelineDot />
                <TimelineContent>
                  <Typography>Delivered</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
            {/* </Status>
            </TrackingInfo> */}
          </TrackingCard>
        </TrackingFirstRow>
        <TrackingSecondRow>
          <TrackingCard>
            <BlockTitle>
              <FormattedMessage id="details" defaultMessage="Product Details" />
            </BlockTitle>
            {/* <Typography variant="h6" component="h1">
              <GetAppIcon className="mt-5" /> Download Invoice
            </Typography> */}
          </TrackingCard>
        </TrackingSecondRow>
        <OrderInfo></OrderInfo>
      </TrackingContainer>
    </TrackingWrapper>
  );
};

export default OrderReceived;
