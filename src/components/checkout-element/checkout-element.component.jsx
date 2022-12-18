import "./checkout-element.styles.scss";

const CheckoutElement = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  console.log(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default CheckoutElement;
