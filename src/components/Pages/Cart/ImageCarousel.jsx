import React from "react";
import "./_cart.scss";

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {},
      imageIndex: 0,
    };
  }
  handleImageButtonClick(next) {
    let length = this.props.product.gallery.length;
    let imageIndex = this.state.imageIndex;
    next
      ? length - 1 === imageIndex
        ? (imageIndex = 0)
        : imageIndex++
      : imageIndex === 0
      ? (imageIndex = length - 1)
      : imageIndex--;
    this.setState({ imageIndex: imageIndex });
  }
  render() {
    let product = this.props.product;
    return (
      <>
        <img
          className={"c-cart__item-img"}
          src={product.gallery[this.state.imageIndex]}
          alt={product.id}
        />
        {product.gallery.length > 1 && (
          <div className={"c-cart__button-group"}>
            <button
              className={"c-cart__button--left"}
              onClick={() => {
                this.handleImageButtonClick(false);
              }}
            >
              &lt;
            </button>
            <button
              className={"c-cart__button--right"}
              onClick={() => {
                this.handleImageButtonClick(true);
              }}
            >
              &gt;
            </button>
          </div>
        )}
      </>
    );
  }
}
export default ImageCarousel;
