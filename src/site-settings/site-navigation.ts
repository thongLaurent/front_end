export const HOME_PAGE = "/";

export const CHECKOUT_PAGE = "/checkout";
export const CHECKOUT_PAGE_TWO = "/checkout-alternative";
export const PROFILE_PAGE = "/profile";
export const ADDRESSES_PAGE = "/addresses";
export const WALLET_PAGE = "/wallet";
export const ORDERS_PAGE = "/orders";

export const YOUR_ORDER_PAGE = "/order";
export const ORDER_RECEIVED_PAGE = "/order-received";

export const HELP_PAGE = "/help";
export const PRODUCTS_PAGE = "/products";
export const TERMS_AND_SERVICES_PAGE = "/terms";
export const PRIVACY_POLICY_PAGE = "/privacy";
export const TRACKING_INFO = "/tracking";
export const PAYMENT_PAGE = "/payment";
// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: "nav.home",
  defaultMessage: "Home",
  href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
  id: "nav.help",
  defaultMessage: "Help",
  href: HELP_PAGE,
};

export const PRODUCTS_MENU_ITEM = {
  id: "nav.products",
  defaultMessage: "Products",
  href: PRODUCTS_PAGE,
};

export const ORDER_MENU_ITEM = {
  id: "nav.order",
  href: YOUR_ORDER_PAGE,
  defaultMessage: "Order",
};

export const PROFILE_MENU_ITEM = {
  id: "nav.profile",
  defaultMessage: "Profile",
  href: PROFILE_PAGE,
};
export const PROFILE_ADDRESSES_ITEM = {
  id: "nav.addresses",
  defaultMessage: "Addresses",
  href: ADDRESSES_PAGE,
};
export const PROFILE_WALLET_ITEM = {
  id: "nav.wallet",
  defaultMessage: "Wallet",
  href: WALLET_PAGE,
};
export const PROFILE_ORDERS_ITEM = {
  id: "nav.orders",
  defaultMessage: "Orders",
  href: ORDERS_PAGE,
};
// export const PAYMENT_PAGE_INFO = {
//   id: "nav.payment",
//   defaultMessage: "Payment",
//   href: PAYMENT_PAGE,
// };
export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  {
    id: "nav.checkout",
    defaultMessage: "Checkout",
    href: CHECKOUT_PAGE,
  },
  {
    id: "nav.tracking",
    defaultMessage: "Tracking",
    href: TRACKING_INFO,
  },
  {
    id: "nav.payment",
    defaultMessage: "Payment",
    href: PAYMENT_PAGE,
  },
  // {
  //   id: 'nav.checkout_two',
  //   href: CHECKOUT_PAGE_TWO,
  //   defaultMessage: 'Checkout Alternative',
  // },
  // ORDER_MENU_ITEM,
  // {
  //   id: 'nav.order_received',
  //   href: ORDER_RECEIVED_PAGE,
  //   defaultMessage: 'Order invoice',
  // },
  // {
  //   id: 'nav.terms_and_services',
  //   defaultMessage: 'Terms and Services',
  //   href: TERMS_AND_SERVICES_PAGE,
  // },
  // {
  //   id: 'nav.privacy_policy',
  //   defaultMessage: 'Privacy Policy',
  //   href: PRIVACY_POLICY_PAGE,
  // },
];
// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [];

export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  PRODUCTS_MENU_ITEM,
  HELP_MENU_ITEM,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [
  PROFILE_MENU_ITEM,
  PROFILE_ADDRESSES_ITEM,
  PROFILE_ORDERS_ITEM,
  PROFILE_WALLET_ITEM,
];

export const LANGUAGE_MENU = [
  {
    id: "en",
    defaultMessage: "English",
    icon: "USFlag",
  },
];
