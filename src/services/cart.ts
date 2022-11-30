import { get, post, destroy } from "config/api";
import axiosMethodRequest from "services/service";
import { apiCalls } from "./../config/apicalls";
export const Cart = {
  modifyCart: (data) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return post("cart/items/modify", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
  getItems: () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return get("cart/items/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },

  deleteFromCart: (data) => {
    // const token = localStorage.getItem("access_token");
    // return post(
    //   "cart/items/modify",
    //   {
    //     productId: productId,
    //     quantity: quantity,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
  },
  CheckOut: () => {
    const token = localStorage.getItem("access_token");
    return post(
      "cart/checkout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
