import React from "react";
import Attr from "../../Attr/Attr";
import ImageCarousel from "./ImageCarousel";
import "./_cart.scss";
class Cart extends React.Component {
  calcCartTotal() {
    let symbol = this.props.symbol;
    let tax = 0;
    let total = 0;
    let quantity = 0;
    if (this.props.cartItems.length !== 0) {
      let cart = this.props.cartItems;
      cart.forEach((item) => {
        item.prices.forEach((element) => {
          if (symbol === element.currency.symbol) {
            total += element.amount * item.qty;
          }
        });
        quantity += item.qty;
      });
      tax = (total / 100) * 21;
    }
    return (
      <>
        <div className="c-cart__tax">
          <p className="c-cart__tax--paragraph">Tax 21%:&nbsp;</p>
          <b className="c-cart__tax--price">{symbol + tax.toFixed(2)}</b>
        </div>

        <div className="c-cart__quantity">
          <p className="c-cart__quantity--paragraph">Quantity:&nbsp;</p>
          <p className="c-cart__quantity--qty">{quantity}</p>
        </div>

        <div className="c-cart__total">
          <p className="c-cart__total--paragraph">Total:&nbsp;</p>
          <p className="c-cart__total--price">{symbol + total.toFixed(2)}</p>
        </div>
      </>
    );
  }
  render() {
    const { onAdd, onRemove, onDelete, cartItems } = this.props;
    return (
      <>
        <div className="c-cart">
          <div className="c-cart__wrapper">
            <div className="c-cart__header">
              <h3 className="c-cart__title">Cart</h3>
            </div>
            <div className="c-cart__empty">
              {cartItems.length === 0 && (
                <p className="c-cart__empty--paragraph">Your cart is empty</p>
              )}
            </div>
            <div className="c-cart__item-divider"></div>
            <div className="c-cart__items">
              {cartItems.map((item) => (
                <>
                  <div className="c-cart__item" key={item.id + "c-cart__item"}>
                    <div className="c-cart__item-left">
                      <div className="c-cart__item-info">
                        <div className="c-cart__item-brand">
                          <p className="c-cart__item-brand--paragraph">
                            {item.brand}
                          </p>
                        </div>
                        <div className="c-cart__item-name">
                          <p className="c-cart__item-name--paragraph">
                            {item.name}
                          </p>
                        </div>
                        <div className="c-cart__item-price">
                          <p className="c-cart__symbol">{this.props.symbol}</p>
                          {Array.from({ length: 5 }).map((el, index) => (
                            <p
                              className={
                                this.props.symbol ===
                                item.prices[index].currency.symbol
                                  ? "c-cart__price"
                                  : "c-cart__price-hide"
                              }
                              key={"c-cart__price" + index}
                            >
                              {item.prices[index].amount * item.qty.toFixed(2)}
                            </p>
                          ))}
                        </div>
                        <div className="c-cart__attributes">
                          {item.attributes.map((attribute, index) => {
                            return (
                              <Attr
                                key={"attrrrr" + attribute + index}
                                attributes={attribute}
                                attribute={attribute}
                                selectedAttribute={this.props.selectedAttribute}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="c-cart__item-count">
                        <button
                          className="c-cart__item-increase"
                          onClick={() => onAdd(item)}
                        >
                          <span className="c-cart__item-increase--plus"></span>
                        </button>
                        <p className="c-cart__item-quantity">{item.qty}</p>
                        <button
                          className="c-cart__item-dicrease"
                          onClick={() => onRemove(item)}
                        >
                          <span className="c-cart__item-dicrease--minus"></span>
                        </button>
                      </div>
                    </div>
                    <div className="c-cart__item-right">
                      <ImageCarousel product={item} />
                    </div>
                  </div>
                  <div className="c-cart__item-divider"></div>
                </>
              ))}
            </div>
            <div className="c-cart__totals">
              {this.calcCartTotal()}
              <buton
                className="c-cart__order-btn"
                onClick={() => onDelete(cartItems.map((item) => item))}
              >
                <span className="c-cart__order-btn--span">order</span>
              </buton>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Cart;
