import { get, post, destroy, put } from "config/api";

export const User = {
  getProfile: () => {
    const token = localStorage.getItem("access_token");
    return get("user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updatePasssword: (changePasswordData) => {
    const token = localStorage.getItem("access_token");
    return post("user/change/password", changePasswordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllAddresses: () => {
    const token = localStorage.getItem("access_token");
    return get("user/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addOrUpdateAddresses: (address) => {
    const token = localStorage.getItem("access_token");
    console.log("address", address);
    let method;
    // = address && address.addressId.tostring() ? put : post;
    if (address && address.id) {
      method = put;
    } else {
      method = post;
    }

    return method("user/address", address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteAddress: (addressId) => {
    const token = localStorage.getItem("access_token");
    return destroy("user/address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        addressId: addressId,
      },
    });
  },
};
