import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../Redux/CartSlice';
import { fireDB } from '../FireBase/FireBaseConfig'
import toast from 'react-hot-toast';
import BuyNow from '../Components/BuyNow';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import '../Style/Cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((prevValue, item) => prevValue + item.quantity, 0);
    const cartTotal = cartItems.reduce((prevValue, item) => prevValue + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = async () => {
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All fields are required");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        };

        try {
            const orderRef = collection(fireDB, 'order');
            await addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            });
            toast.success("Order Placed Successfully");
        } catch (error) {
            console.log(error);
        }
    }

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
                                    const { id, title, price, productImageUrl, quantity, category } = item;
                                    return (
                                        <div key={index} className="cart-item">
                                            <li className="cart-item-detail">
                                                <div className="cart-item-image">
                                                    <img
                                                        src={productImageUrl}
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
                                {user ? (
                                    <BuyNow
                                        addressInfo={addressInfo}
                                        setAddressInfo={setAddressInfo}
                                        buyNowFunction={buyNowFunction}
                                    />
                                ) : (
                                    <Navigate to={'/login'} />
                                )}
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}

export default Cart;
