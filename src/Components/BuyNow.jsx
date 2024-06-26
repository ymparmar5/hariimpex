import React, { useState } from 'react';
import axios from 'axios';
import { fireDB } from '../FireBase/FireBaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import crypto from 'crypto';

const BuyNow = ({ cartItems }) => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    };

    const generateChecksum = (payload, saltKey) => {
        const hash = crypto.createHash('sha256');
        hash.update(payload + "/pg/v1/pay" + saltKey);
        return hash.digest('hex');
    };

    const handlePayment = async (orderInfo) => {
        const saltKey = '331fd028-b27c-42c7-b62f-46401943a3c3'; // Replace with your salt key
        const saltIndex = '1'; // Replace with your salt index
        const payload = JSON.stringify({
            merchantId: 'M22EJDYBLPU2G',
            amount: orderInfo.totalAmount,
            orderId: orderInfo.orderId,
            merchantOrderId: orderInfo.orderId,
            successUrl: 'http://localhost:3000/success',
            failureUrl: 'http://localhost:3000/fail',
        });
        const checksum = generateChecksum(payload, saltKey) + '###' + saltIndex;

        try {
            const response = await axios.post('https://api.phonepe.com/apis/hermes/initiate', {
                merchantId: 'M22EJDYBLPU2G',
                amount: orderInfo.totalAmount,
                orderId: orderInfo.orderId,
                merchantOrderId: orderInfo.orderId,
                successUrl: 'http://localhost:3000/success',
                failureUrl: 'http://localhost:3000/fail',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'X-CALLBACK-URL': 'http://localhost:3000/callback',
                },
            });

            if (response.data.success) {
                window.location.href = response.data.paymentUrl;
            } else {
                toast.error('Failed to initiate payment. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Payment initiation failed. Please try again.');
        }
    };

    const buyNowFunction = async () => {
        if (!user) {
            return navigate('/sign-in');
        }

        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All fields are required");
        }

        const totalAmount = cartItems.reduce((prevValue, item) => prevValue + item.price * item.quantity, 0);

        const orderInfo = {
            cartItems,
            addressInfo: {
                ...addressInfo,
                time: addressInfo.time.toDate().toString()
            },
            email: user.email,
            userid: user.uid,
            status: "pending",
            totalAmount,
            time: Timestamp.now().toDate().toString(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            ),
            orderId: `${user.uid}-${Date.now()}`
        };

        try {
            // Save the order with pending status to Firestore
            const orderRef = collection(fireDB, 'order');
            await addDoc(orderRef, orderInfo);
            toast.success("Redirecting to payment gateway");

            // Trigger the payment process
            handlePayment(orderInfo);

            setAddressInfo({
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
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again later");
        }
    };

    return (
        <div>
            <h2>Enter Shipping Details</h2>
            <form>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={addressInfo.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={addressInfo.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={addressInfo.pincode}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={addressInfo.mobileNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={buyNowFunction}>Buy Now</button>
            </form>
        </div>
    );
};

export default BuyNow;
