import React from "react";
import clsx from "clsx";
import "./_attr.scss";

class Attr extends React.Component {
  render() {
    const {
      attributes: { items, name, id, type },
      selectedAttribute,
      attribute,
      onSelectAttr = () => {},
      isCartPage = false,
    } = this.props;
    const isAttrColor = name === "Color";
    return (
      <>
        <div className="c-attr">
          <h2 className="c-attr__name">{name}</h2>
          <div className="c-attr_items">
            {items.map((item, index) => (
              <button
                className={clsx({
                  "c-attr__selected-item":
                    selectedAttribute[attribute.type + ":" + attribute.id] ===
                    item.id,

                  items: true,
                  "c-attr__in-cart": isCartPage && !isAttrColor,
                  "c-attr__color-in-cart": isCartPage && isAttrColor,
                  "c-attr__other": !isAttrColor,
                  "c-attr__color": isAttrColor,
                  "hover-effect": true,
                  "cursor-pointer": !isCartPage,
                })}
                onClick={() => onSelectAttr(this.props.attribute, item.id)}
                key={"c-attr__item" + index}
              >
                {!isAttrColor && (
                  <p
                    className={
                      isCartPage
                        ? "c-attr__item--val-cart"
                        : "c-attr__item--value"
                    }
                  >
                    {item.value}
                  </p>
                )}
                {isAttrColor && (
                  <div style={{ backgroundColor: item.value }}></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Attr;
