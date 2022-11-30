import React, { useContext } from "react";
import Router, { useRouter } from "next/router";
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
import LogoImage from "assets/images/logo.png";
import UserImage from "assets/images/user.jpg";
import { isCategoryPage } from "../is-home-page";
import Search from "features/search/search";
import { ProfileContext } from "contexts/profile/profile.context";
import { reducer } from "./../../contexts/cart/cart.reducer";
import { useCart } from "./../../contexts/cart/use-cart";
import ChangePassword from "components/change-password/change-password";
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  // const {
  //   // authState: { isAuthenticated },
  //   authDispatch,
  // } = React.useContext<any>(AuthContext);
  const { profileState } = useContext(ProfileContext);
  const { getcartProducts } = useCart();
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });

      // clearCartHandler;
      // let state = {
      //   isOpen: false,
      //   items: [],
      //   isRestaurant: false,
      //   coupon: null,
      // };
      // let action = {
      //   payload: {
      //     isOpen: false,
      //     items: [],
      //     isRestaurant: false,
      //     coupon: null,
      //   },

      //   type: "REHYDRATE",
      // };
      // reducer(state, action);
      Router.push("/products");
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });
    openModal({
      show: true,
      component: AuthenticationForm,
      config: {
        className: "customModal",
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        height: "auto",
        // animationFrom: { transform: "scale(0.3)" }, // react-spring <Spring from={}> props value
        // animationTo: { transform: "scale(1)" }, //  react-spring <Spring to={}> props value
        // transition: {
        //   mass: 1,
        //   tension: 130,
        //   friction: 26,
        // }, // react-spring config props
      },
      withRnd: false,
      overlayClassName: "customeOverlayClass",
      closeOnClickOutside: false,
    });
  };

  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal"
  ) => {
    openModal({
      config: {
        className: className,
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        height: 347,
        animationFrom: { transform: "scale(0.3)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "scale(1)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        }, // react-spring config props
      },
      withRnd: false,
      overlayClassName: "customeOverlayClass",
      closeOnClickOutside: false,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleChnagePassword = () => {
    const changePassword = {
      confirmPassword: "",
      email: profileState.email,
      newPassword: "",
      oldPassword: "",
    };
    handleModal(ChangePassword);
  };

  const type = pathname === "/restaurant" ? "restaurant" : query.type;
  const showSearch = isCategoryPage(type);
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />
      {showSearch && <Search minimal={true} className="headerSearch" />}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        onChangePassword={handleChnagePassword}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
