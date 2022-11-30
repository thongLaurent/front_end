import React, { useReducer, useContext, createContext } from "react";
import Router from "next/router";
import { reducer, cartItemsTotalPrice } from "./cart.reducer";
import { useStorage } from "utils/use-storage";
//carts import
import { Cart } from "services/cart";
import { initialState } from "contexts/app/app.reducer";
const CartContext = createContext({} as any);
const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: null,
  checkoutItems: [],
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);
  // const token = localStorage.getItem("access_token");

  const addItemHandler = (item, quantity = 1) => {
    let body = {
      productId: item.id,
      quantity: item.quantity + 1,
    };
    Cart.modifyCart(body).then((res) => {
      if (res && res.data && res.data.data) {
        let items = res.data.data;
        let modifiedItems = [];
        items.forEach((_item, _index) => {
          let modifiedData = {
            ..._item,
            ..._item.productResponse,
          };
          modifiedItems.push(modifiedData);
        });
        initialCart.items = modifiedItems;
        rehydrateLocalState(initialCart);
      }
    });
  };

  const removeItemHandler = (item, quantity = 1) => {
    let body = {
      productId: item.id,
      quantity: item.quantity - 1,
    };
    Cart.modifyCart(body).then((res) => {
      if (res && res.data && res.data.data) {
        let items = res.data.data;
        let modifiedItems = [];
        items.forEach((_item, _index) => {
          let modifiedData = {
            ..._item,
            ..._item.productResponse,
          };
          modifiedItems.push(modifiedData);
        });
        initialCart.items = modifiedItems;
        rehydrateLocalState(initialCart);
      }
    });
    // dispatch({ type: "REMOVE_ITEM", payload: { ...item, quantity } });
  };
  const getcartProductsHandler = () => {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      Cart.getItems().then((res) => {
        if (res && res.data && res.data.data) {
          let items = res.data.data;
          let modifiedItems = [];
          items.forEach((_item, _index) => {
            let modifiedData = {
              ..._item,
              ..._item.productResponse,
            };
            modifiedItems.push(modifiedData);
          });
          initialCart.items = modifiedItems;
          rehydrateLocalState(initialCart);
        }
      });
    }

    // dispatch({ type: "CLEAR_ITEM_FROM_CART", payload: item });
  };
  const clearItemFromCartHandler = (item) => {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      let body = {
        productId: item.id,
        quantity: 0,
      };
      Cart.modifyCart(body).then((res) => {
        if (res && res.data && res.data.data) {
          let items = res.data.data;
          let modifiedItems = [];
          items.forEach((_item, _index) => {
            let modifiedData = {
              ..._item,
              ..._item.productResponse,
            };
            modifiedItems.push(modifiedData);
          });
          initialCart.items = modifiedItems;
          rehydrateLocalState(initialCart);
        }
      });
    }
    dispatch({ type: "CLEAR_ITEM_FROM_CART", payload: item });
  };
  const checkOutHandler = (type) => {
    console.log("state 1", state);
    Cart.CheckOut().then((res) => {
      if (res && res.data && res.data.data) {
        let items = res.data.data;
        let modifiedItems = [];
        items.forEach((_item, _index) => {
          let modifiedData = {
            ..._item,
            ..._item.productResponse,
          };
          modifiedItems.push(modifiedData);
        });
        console.log("modified data", modifiedItems);
        INITIAL_STATE.checkoutItems = modifiedItems;
        dispatch({ type: "CHECKOUT_CART", payload: INITIAL_STATE });
        Router.push("/checkout");
        return modifiedItems;
      }
      console.log("check out response", res);
    });
    // console.log("checj out handler");
    // dispatch({ type: "CHECKOUT_CART" });
    console.log("state 2", state);
  };

  const clearCartHandler = (type) => {
    dispatch({ type: "CLEAR_CART" });
  };
  const toggleCartHandler = () => {
    dispatch({ type: "TOGGLE_CART" });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: "APPLY_COUPON", payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: "REMOVE_COUPON" });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: "REHYDRATE", payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: "TOGGLE_RESTAURANT" });
  };
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    const discount = state.coupon
      ? (total * Number(state.coupon?.discountInPercent)) / 100
      : 0;
    return discount.toFixed(2);
  };
  const getCheckOutItemsPrice = () =>
    cartItemsTotalPrice(state.checkoutItems).toFixed(2);
  const getCheckOutItemsTotalPrice = () =>
    cartItemsTotalPrice(state.checkoutItems, state.coupon).toFixed(2);
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
    getcartProductsHandler,
    clearItemFromCartHandler,
    checkOutHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCheckOutItemsTotalPrice,
    getCartItemsPrice,
    getCheckOutItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    toggleRestaurant,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    removeItemHandler,
    getcartProductsHandler,
    clearItemFromCartHandler,
    checkOutHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCheckOutItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getCheckOutItemsPrice,
    getDiscount,
    toggleRestaurant,
  } = useCartActions();
  const { rehydrated, error } = useStorage(state, rehydrateLocalState);
  console.log("12345", state);
  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,
        checkoutItems: state.checkoutItems,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        getcartProducts: getcartProductsHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        checkOut: checkOutHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        checkOutTotalPrice: getCheckOutItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,
        calculategetCheckoutTotalPrice: getCheckOutItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        toggleRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
