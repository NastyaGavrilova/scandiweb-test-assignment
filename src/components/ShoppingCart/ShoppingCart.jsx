import React from "react";
import Attr from "../Attr/Attr";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./_shoppingCart.scss";

class ShoppingCart extends React.Component {
  calculateTotal() {
    let total = 0;
    if (this.props.cartItems.length !== 0) {
      let cart = this.props.cartItems;
      cart.forEach((item) => {
        item.prices.forEach((element, index) => {
          if (this.props.symbol === element.currency.symbol) {
            total += element.amount * item.qty;
          }
        });
      });
    }
    return total.toFixed(2);
  }
  render() {
    const { onAdd, onRemove, onDelete, active, count, cartItems } = this.props;
    return (
      <>
        <div
          className={active ? "c-shopping-cart" : "c-shopping-cart-inactive"}
        >
          <div className="c-shopping-cart__wrapper">
            <div className="c-shopping-cart__header">
              <p className="c-shopping-cart__title">My Bag, </p>
              <p className="c-shopping-cart__counter">
                {count ? count : 0} items
              </p>
            </div>
            <div onClick={() => console.log(cartItems)}>
              {cartItems.length === 0 && (
                <div
                  className="c-basket__empty"
                  on
                  onClick={() => console.log(cartItems)}
                >
                  Cart is empty
                </div>
              )}
            </div>
            <div className="c-shopping-cart__items">
              {cartItems.map((item) => (
                <>
                  <div
                    className="c-shopping-cart__item"
                    key={"c-shopping-cart__item" + item.id}
                  >
                    <div className="c-shopping-cart__item-info">
                      <div className="c-shopping-cart__item-descr">
                        <h2 className="c-shopping-cart__item-brand">
                          {item.brand}
                        </h2>
                        <h2 className="c-shopping-cart__item-name">
                          {item.name}
                        </h2>
                        <div className="c-shopping-cart__item-price">
                          <p className="c-shopping-cart__symbol">
                            {this.props.symbol}
                          </p>
                          {Array.from({ length: 5 }).map((el, index) => (
                            <p
                              className={
                                this.props.symbol ===
                                item.prices[index].currency.symbol
                                  ? "c-shopping-cart__price"
                                  : "c-shopping-cart__price-hide"
                              }
                              key={"c-shopping-cart__price" + index}
                            >
                              {item.prices[index].amount * item.qty.toFixed(2)}
                            </p>
                          ))}
                        </div>
                        <div className="c-shopping-cart__attributes">
                          {item.attributes.map((attribute, index) => {
                            return (
                              <Attr
                                key={"attr" + attribute + index}
                                attributes={attribute}
                                attribute={attribute}
                                selectedAttribute={this.props.selectedAttribute}
                                isCartPage={true}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="c-shopping-cart__item-count">
                        <button
                          className="c-shopping-cart__item-increase"
                          onClick={() => onAdd(item)}
                        >
                          <span className="c-shopping-cart__item-increase--plus"></span>
                        </button>
                        <p className="c-shopping-cart__item-quantity">
                          {item.qty}
                        </p>
                        <button
                          className="c-shopping-cart__item-dicrease"
                          onClick={() => onRemove(item)}
                        >
                          <span className="c-shopping-cart__item-dicrease--minus"></span>
                        </button>
                      </div>
                    </div>
                    <div className="c-shopping-cart__image-product">
                      <img
                        className="c-shopping-cart__img"
                        src={item.gallery[0]}
                        alt={item.id}
                      ></img>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="c-shopping-cart__total">
              <p className="c-shopping-cart__total--paragraph">Total</p>

              <p className="c-shopping-cart__total--price">
                {this.props.symbol}
                {this.calculateTotal()}
              </p>
            </div>
            <div className="c-shopping-cart__buttons">
              <Link to="/cart" className="c-shopping-cart__view-bag">
                <span className="c-shopping-cart__view-bag--paragraph">
                  VIEW BAG
                </span>
              </Link>
              <button
                className="c-shopping-cart__checkout"
                onClick={() => onDelete(cartItems.map((item) => item))}

                // onClick={() => onDelete(cartItems.map((item) => item))}
              >
                <span className="c-shopping-cart__checkout--paragraph">
                  CHECKOUT
                </span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ShoppingCart;
