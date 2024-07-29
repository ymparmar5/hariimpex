import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import sha256 from "crypto-js/sha256";
import "../Style/Buynow.css";
import myContext from "../Context/myContext";

const BuyNow = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, cartTotal } = location.state || {
        cartItems: [],
        cartTotal: 0,
    };
    const context = useContext(myContext);
    const { addOrder, setLoading } = context; 

    const handleFormData = (e) => {
        const updatedData = { ...data, [e.target.name]: e.target.value };
        setData(updatedData);
    };

    const makePayment = async (e) => {
        e.preventDefault();

        if (!data.name || !data.mobile || !data.address || !data.pincode) {
            toast.error("Please fill out all required fields.");
            return;
        }

        const orderId = uuidv4();
        const orderDetails = {
            ...data,
            orderId,
            status: "pending",
            items: cartItems,
            totalAmount: cartTotal,
            time: Timestamp.now(),        
           date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        };

        setLoading(true);
        try {
            await addOrder(orderDetails);

            const payload = {
                merchantId: import.meta.env.VITE_MERCHANT_ID,
                merchantTransactionId: orderId,
                merchantUserId: "test1314",
                amount: cartTotal * 100, // Convert from paisa to rupees
                redirectUrl: `https://hariimpex.in/success?orderId=${orderId}`,
                redirectMode: "REDIRECT",
                callbackUrl: `https://hariimpex.in/2e6bdb93-1f2e-40f5-bf47-93a466f953c1?orderId=${orderId}`,
                mobileNumber: data.mobile,
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            };

            const saltKey = import.meta.env.VITE_SALT_KEY;
            const saltIndex = "1";

            const base64 = btoa(JSON.stringify(payload));
            const url = `${base64}/pg/v1/pay${saltKey}`;

            const sha = await sha256(url);
            const checksum = `${sha}###${saltIndex}`;
            const paymentData = { base64, checksum };

            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${backendUrl}/checkout`, paymentData);
            if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
                window.location.href =
                    res.data.data.instrumentResponse.redirectInfo.url;
            } else {
                toast.error("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="buynow-container">
            <div className="buynow-form-container">
                <form className="space-y-4" action="#" method="POST">
                    <div className="buynow-form-group">
                        <label htmlFor="name" className="buynow-label">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            onChange={handleFormData}
                            type="text"
                            autoComplete="name"
                            required
                            className="buynow-input"
                        />
                    </div>
                    <div className="buynow-form-group">
                        <label htmlFor="Mobile" className="buynow-label">
                            Mobile
                        </label>
                        <input
                            id="Mobile"
                            name="mobile"
                            onChange={handleFormData}
                            type="tel"
                            autoComplete="tel"
                            required
                            className="buynow-input"
                        />
                    </div>
                    <div className="buynow-form-group">
                        <label htmlFor="address" className="buynow-label">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            onChange={handleFormData}
                            type="text"
                            autoComplete="street-address"
                            required
                            className="buynow-input"
                        />
                    </div>
                    <div className="buynow-form-group">
                        <label htmlFor="pincode" className="buynow-label">
                            Pincode
                        </label>
                        <input
                            id="pincode"
                            name="pincode"
                            onChange={handleFormData}
                            type="text"
                            required
                            className="buynow-input"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={makePayment}
                        className="buynow-button"
                    >
                        Pay
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BuyNow;
