
import React, { useState } from 'react';
import "../Style/Buynow.css"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import { fireDB } from '../FireBase/FireBaseConfig';
import { addDoc, updateDoc, collection, doc } from 'firebase/firestore';


const BuyNow = () => {
  const { state } = useLocation();

  const [data, setData] = useState({
    
    name: 'DemoTest',
    mobile: '9999999990',
    amount: state.amount.cartTotal || 0,
    productName: state?.productName || '',
    address: 'asd',
    pincode: '395004',
    muid: 'nuid-909090',
  });

  const handleFormData = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
  };

  const makePayment = async (e) => {
    e.preventDefault();

    const payload = {
      merchantId: import.meta.env.VITE_MERCHANT_ID,
      merchantTransactionId:"tid"+ uuidv4(),
      merchantUserId:"mid"+ uuidv4(),
      amount: data.amount,
      redirectUrl: 'https://hariimpex.in/success', 
      redirectMode: 'REDIRECT',
      callbackUrl: 'https://webhook.site/2e6bdb93-1f2e-40f5-bf47-93a466f953c1',
      mobileNumber: "8153843001",
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    console.log("@@",payload)
    const saltKey = import.meta.env.VITE_SALT_KEY;
    console.log("salt",saltKey)
    const base64 = btoa(JSON.stringify(payload));
    const url = base64 + '/pg/v1/pay' + saltKey;
    const sha =  sha256(url);
    const checksum = `${sha}###1`;
    console.log(checksum,"checksum");
    const finalData = { base64, checksum };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/checkout`, finalData);

    const redirectUrl = res.data.data.instrumentResponse.redirectInfo.url;

    // Save order data to Firebase before redirecting
    // const orderRef = await addDoc(collection(fireDB, 'orders'), {
    //   ...data,
    //   orderId: payload.merchantTransactionId,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    // Redirect to payment
    window.location.href = redirectUrl;

    // Update order status to 'done' after payment is complete

    await updateDoc(doc(fireDB, 'orders', orderRef.id), {
      status: 'done',
    });
  };

  return (
    <div className="buynow-container">
      <div className="buynow-form-wrapper">
        <form className="buynow-form" onSubmit={makePayment}>
          <div className="buynow-form-group">
            <label htmlFor="name" className="buynow-label">Name</label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div className="buynow-form-group">
            <label htmlFor="mobile" className="buynow-label">Mobile</label>
            <input
              id="mobile"
              name="mobile"
              value={data.mobile}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div className="buynow-form-group">
            <label htmlFor="amount" className="buynow-label">Amount</label>
            <input
              id="amount"
              name="amount"
              value={state.amount.cartTotal}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div className="buynow-form-group">
            <label htmlFor="address" className="buynow-label">Address</label>
            <input
              id="address"
              name="address"
              value={data.address}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div className="buynow-form-group">
            <label htmlFor="pincode" className="buynow-label">Pincode</label>
            <input
              id="pincode"
              name="pincode"
              value={data.pincode}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div className="buynow-form-group">
            <label htmlFor="muid" className="buynow-label">MUID</label>
            <input
              id="muid"
              name="muid"
              value={data.muid}
              onChange={handleFormData}
              type="text"
              required
              className="buynow-input"
            />
          </div>
          <div>
            <button
              type="submit"
              className="buynow-button"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNow;
