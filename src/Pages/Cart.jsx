import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../Redux/CartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../Style/Cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handlePayment = () => {
        navigate('/buy-now', { state: { cartItems, cartTotal } });
    };

    const cartItemTotal = cartItems.reduce((prevValue, item) => prevValue + item.quantity, 0);
    const cartTotal = cartItems.reduce((prevValue, item) => prevValue + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="cart-main-content">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                </div>
                <form className="cart-form">
                    <section className="cart-items-section">
                        <h2 className="sr-only">Items in your shopping cart</h2>
                        <ul className="cart-items-list">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => {
                                    const { id, title, price, imgurl1, quantity, category } = item;
                                    return (
                                        <div key={index} className="cart-item">
                                            <li className="cart-item-detail">
                                                <div className="cart-item-image">
                                                    <img
                                                        src={imgurl1}
                                                        alt="img"
                                                        className="image"
                                                    />
                                                </div>
                                                <div className="cart-item-info">
                                                    <div className="cart-item-text">
                                                        <div className="cart-item-title">
                                                            <h3>{title}</h3>
                                                        </div>
                                                        <div className="cart-item-category">
                                                            <p>{category}</p>
                                                        </div>
                                                        <div className="cart-item-price">
                                                            <p>₹{price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <div className="cart-item-actions">
                                                <div className="quantity-controls">
                                                    <button onClick={() => handleDecrement(id)} type="button" className="quantity-button">-</button>
                                                    <input
                                                        type="text"
                                                        className="quantity-input"
                                                        value={quantity}
                                                        readOnly
                                                    />
                                                    <button onClick={() => handleIncrement(id)} type="button" className="quantity-button">+</button>
                                                </div>
                                                <div className="remove-button-container">
                                                    <button onClick={() => deleteCart(item)} type="button" className="remove-button">
                                                        <Trash size={12} className="trash-icon" />
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <h1>Not Found</h1>
                            )}
                        </ul>
                    </section>
                    <section className="order-summary-section">
                        <h2 className="order-summary-header">Price Details</h2>
                        <div className="order-summary-details">
                            <dl>
                                <div className="summary-detail">
                                    <dt>Price ({cartItemTotal} items)</dt>
                                    <dd>₹ {cartTotal}</dd>
                                </div>
                                <div className="summary-detail">
                                    <dt>Delivery Charges</dt>
                                    <dd>Free</dd>
                                </div>
                                <div className="summary-total">
                                    <dt>Total Amount</dt>
                                    <dd>₹ {cartTotal}</dd>
                                </div>
                            </dl>
                            <div className="buy-now-container">
                                <button onClick={handlePayment} className="login-to-buy-button">Buy Now</button>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default Cart;
