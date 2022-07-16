import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import Attr from "../../Attr/Attr";
import "./_pdp.scss";
class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: "",
      cartItems: [],
    };
  }

  selectImage = (imageIndex) => {
    this.setState(() => ({
      selectedImage: this.props.gallery[imageIndex],
    }));
  };

  render() {
    const { selectedAttributes } = this.state;
    return (
      <>
        <section className="c-product-page">
          <div className="c-product-page__wrapper">
            <div className="c-product-page__gallery">
              <div className="c-product-page__carusel">
                {this.props.gallery.map((image, index) => (
                  <div
                    className="c-product-page__gallery-item"
                    key={"product-image-11" + index}
                    onClick={() => this.selectImage(index)}
                  >
                    <img
                      className="c-product-page__image"
                      src={image}
                      alt={this.props.name}
                    ></img>
                  </div>
                ))}
              </div>

              <img
                src={
                  this.state.selectedImage === ""
                    ? this.props.gallery[0]
                    : this.state.selectedImage
                }
                alt="selected-product"
                className="c-product-page__selected-image"
              ></img>
            </div>
            <div className="c-product-page__description">
              <div className="c-product-page__brand-name">
                <h4 className="c-product-page__brand">{this.props.brand}</h4>
                <p className="c-product-page__name">{this.props.name}</p>
              </div>
              <div className="c-product-page__attributes">
                {this.props.attributes.map((attribute, index) => {
                  return (
                    <div key={attribute + index}>
                      <Attr
                        attributes={attribute}
                        attribute={attribute}
                        selectedAttribute={this.props.selectedAttribute}
                        onSelectAttr={this.props.onSelectAttr}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="c-product-page__price">
                <p
                  className="c-product-page__price--paragraph"
                  onClick={() => console.log({ selectedAttributes })}
                >
                  PRICE:
                </p>

                <div className="c-product-page__amount">
                  <p className="c-product-page__symbol">{this.props.symbol}</p>

                  {Array.from({ length: 5 }).map((el, index) => (
                    <p
                      className={
                        this.props.symbol ===
                        this.props.prices[index].currency.symbol
                          ? "c-product-page__price--amont"
                          : "c-product-page__price--amont-hide"
                      }
                      key={"c-product-page__price--amont" + index}
                    >
                      {this.props.prices[index].amount}
                    </p>
                  ))}
                </div>
              </div>
              <button
                className="c-product-page__add-to-cart"
                onClick={this.props.onAdd}
              >
                ADD TO CART
              </button>
              <div
                className="c-product-page__descr"
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              ></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default PDP;
