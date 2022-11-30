// product card for general
import React, { useEffect } from "react";
import Image from "components/image/image";
import { Button } from "components/button/button";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from "../product-card.style";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { cartAnimation } from "utils/cart-animation";
import { FormattedMessage } from "react-intl";
import { CartIcon } from "assets/icons/CartIcon";

////////////////////////////////
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";

type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  currency: string;
  description: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const {
    addItem,
    removeItem,
    getItem,
    isInCart,
    items,
    useCartActions,
    clearCart,
    getcartProducts,
    checkoutItems,
  } = useCart();
  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    if (!access_token && (items.length || checkoutItems.length)) {
      clearCart();
    }
    console.log("I am produvts", checkoutItems);
  });
  const handleAddClick = async (e, type) => {
    e.stopPropagation();
    items.forEach((item, index) => {
      if ((item && item.id) == (data && data.id)) {
        addItem(item);
      }
    });
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
    //for no item and checking authentication
    if (type == "noitem") {
      let accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        await handleJoin();
      } else {
        data.quantity = 0;
        addItem(data);
      }
    }
    
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    items.forEach((item, index) => {
      if ((item && item.id) == (data && data.id)) {
        removeItem(item);
      }
    });
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
    });
  };
  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: "relative" }}
          alt={title}
        />
        {discountInPercent ? (
          <>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>
        ) : (
          ""
        )}
      </ProductImageWrapper>

      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
                {price}
              </span>
            ) : (
              ""
            )}

            <span className="product-price">
              {currency}
              {salePrice ? salePrice : price}
            </span>
          </div>

          {!isInCart(data.id) ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
              onClick={(e) => handleAddClick(e, "noitem")}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={getItem(data.id).quantity}
              onDecrement={handleRemoveClick}
              onIncrement={(e) => handleAddClick(e, null)}
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
