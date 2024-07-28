import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fireDB } from "../FireBase/FireBaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import sha256 from "crypto-js/sha256";
import "../Style/Buynow.css"; // Import the custom CSS file

const BuyNow = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const { cartItems, cartTotal } = location.state || {
    cartItems: [],
    cartTotal: 0,
  };

  const handleFormData = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
  };

  const makePayment = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!data.name || !data.mobile || !data.address || !data.pincode) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const orderId = uuidv4();

    const payload = {
      merchantId: import.meta.env.VITE_MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: "test1314",
      amount: cartTotal, // Use cartTotal here
      redirectUrl: `https://hariimpex.in/success?orderId=${orderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `https://hariimpex.in/2e6bdb93-1f2e-40f5-bf47-93a466f953c1?orderId=${orderId}`,
      mobileNumber: data.mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    console.log("payload :>> ", payload);
    try {
      // Add order to Firebase with "pending" status
      await addDoc(collection(fireDB, "orders"), {
        ...data,
        orderId,
        status: "pending",
        createdAt: Timestamp.now(),
        items: cartItems,
        totalAmount: cartTotal,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to create order. Please try again.");
      return;
    }

    const saltKey = import.meta.env.VITE_SALT_KEY;
    const saltIndex = "1";

    const base64 = btoa(JSON.stringify(payload));
    const url = `${base64}/pg/v1/pay${saltKey}`;

    const sha = await sha256(url);
    const checksum = `${sha}###${saltIndex}`;
    const paymentData = { base64, checksum };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("payload", payload);
      console.log("11", paymentData);
      const res = await axios.post(`${backendUrl}/checkout`, paymentData);
      console.log("22", res);
      if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href =
          res.data.data.instrumentResponse.redirectInfo.url;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (e) {
      console.error("Error during payment processing: ", e.message);
      toast.error("Failed to process payment. Please try again.");
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
              autoComplete="address"
              required
              style={{ height: '140px' }}  
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
              autoComplete="postal-code"
              required
              className="buynow-input"
            />
          </div>

          <div className="buynow-button-container">
            <button
              type="submit"
              onClick={makePayment}
              className="buynow-button"
            >
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNow;
