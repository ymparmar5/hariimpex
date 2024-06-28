// import React, { useState } from 'react';
// import axios from 'axios';
// import { fireDB } from '../FireBase/FireBaseConfig';
// import { Timestamp, addDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import crypto from 'crypto';


// const BuyNow = ({ cartItems }) => {
//     const user = JSON.parse(localStorage.getItem('users'));
//     const navigate = useNavigate();

//     const [addressInfo, setAddressInfo] = useState({
//         name: "",
//         address: "",
//         pincode: "",
//         mobileNumber: "",
//         time: Timestamp.now(),
//         date: new Date().toLocaleString(
//             "en-US",
//             {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             }
//         )
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setAddressInfo({ ...addressInfo, [name]: value });
//     };

//     const generateChecksum = (payload, saltKey) => {
//         const hash = crypto.createHash('sha256');
//         hash.update(payload + "/pg/v1/pay" + saltKey);
//         return hash.digest('hex');
//     };

//     const handlePayment = async (orderInfo) => {
//         const saltKey = '331fd028-b27c-42c7-b62f-46401943a3c3'; // Replace with your salt key
//         const saltIndex = '1'; // Replace with your salt index
//         const payload = JSON.stringify({
//             merchantId: 'M22EJDYBLPU2G',
//             amount: orderInfo.totalAmount,
//             orderId: orderInfo.orderId,
//             merchantOrderId: orderInfo.orderId,
//             successUrl: 'http://localhost:3000/success',
//             failureUrl: 'http://localhost:3000/fail',
//         });
//         const checksum = generateChecksum(payload, saltKey) + '###' + saltIndex;

//         try {
//             const response = await axios.post('https://api.phonepe.com/apis/hermes/initiate', {
//                 merchantId: 'M22EJDYBLPU2G',
//                 amount: orderInfo.totalAmount,
//                 orderId: orderInfo.orderId,
//                 merchantOrderId: orderInfo.orderId,
//                 successUrl: 'http://localhost:3000/success',
//                 failureUrl: 'http://localhost:3000/fail',
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-VERIFY': checksum,
//                     'X-CALLBACK-URL': 'http://localhost:3000/callback',
//                 },
//             });

//             if (response.data.success) {
//                 window.location.href = response.data.paymentUrl;
//             } else {
//                 toast.error('Failed to initiate payment. Please try again.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Payment initiation failed. Please try again.');
//         }
//     };

//     const buyNowFunction = async () => {

//         if (!user) {
//             return navigate('/sign-in');
//         }

//         if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
//             return toast.error("All fields are required");
//         }

//         const totalAmount = cartItems.reduce((prevValue, item) => prevValue + item.price * item.quantity, 0);

//         const orderInfo = {
//             cartItems,
//             addressInfo: {
//                 ...addressInfo,
//                 time: addressInfo.time.toDate().toString()
//             },
//             email: user.email,
//             userid: user.uid,
//             status: "pending",
//             totalAmount,
//             time: Timestamp.now().toDate().toString(),
//             date: new Date().toLocaleString(
//                 "en-US",
//                 {
//                     month: "short",
//                     day: "2-digit",
//                     year: "numeric",
//                 }
//             ),
//             orderId: `${user.uid}-${Date.now()}`
//         };

//         try {
//             // Save the order with pending status to Firestore
//             const orderRef = collection(fireDB, 'order');
//             await addDoc(orderRef, orderInfo);
//             toast.success("Redirecting to payment gateway");

//             // Trigger the payment process
//             handlePayment(orderInfo);

//             setAddressInfo({
//                 name: "",
//                 address: "",
//                 pincode: "",
//                 mobileNumber: "",
//                 time: Timestamp.now(),
//                 date: new Date().toLocaleString(
//                     "en-US",
//                     {
//                         month: "short",
//                         day: "2-digit",
//                         year: "numeric",
//                     }
//                 )
//             });
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong, please try again later");
//         }
//     };

//     return (
//         <div>
//             <h2>Enter Shipping Details</h2>
//             <form>
//                 <div>
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={addressInfo.name}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={addressInfo.address}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Pincode</label>
//                     <input
//                         type="text"
//                         name="pincode"
//                         value={addressInfo.pincode}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Mobile Number</label>
//                     <input
//                         type="text"
//                         name="mobileNumber"
//                         value={addressInfo.mobileNumber}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <button type="button" onClick={buyNowFunction}>Buy Now</button>
//             </form>
//         </div>
//     );
// };

// export default BuyNow;

import React, { useState } from 'react';
import axios from 'axios';
import { fireDB } from '../FireBase/FireBaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";
import { Buffer } from 'buffer';
import sha256 from "crypto-js/sha256";




const BuyNow = () => {


    const [data, setData] = useState();

    const handleFormData = (e) => {
        // console.log(e.target.value);
        const dd = { ...data, [e.target.name]: e.target.value };
        setData(dd);
    };


    const makePayment = async (e) => {

        e.preventDefault();

        const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

        const payload = {
            merchantId: "M22EJDYBLPU2G",
            merchantTransactionId: transactionid,
            merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            amount: 10000,
            redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:5173/callback${transactionid}`,
            mobileNumber: '9999999999',
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };


        const dataPayload = JSON.stringify(payload);
        console.log(dataPayload);

        const dataBase64 = Buffer.from(dataPayload).toString("base64");
        console.log(dataBase64);


        const fullURL =
            dataBase64 + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"

            ;
        const dataSha256 = sha256(fullURL);

        const checksum = dataSha256 + "###" + "d7a8e4458caa6fcd781166bbdc85fec76740c18cb9baa9a4c48cf2387d554180###1";
        console.log("c====", checksum);



        const UAT_PAY_API_URL =
            "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";


        const response = await axios.post(
            UAT_PAY_API_URL,
            {
                request: dataBase64,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
            }
        );


        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        router.push(redirect)


    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                value="DemoTest"
                                onChange={(e) => handleFormData(e)}
                                type="name"
                                autoComplete="name"
                                required=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="Mobile"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Mobile
                        </label>
                        <div className="mt-2">
                            <input
                                id="Mobile"
                                name="mobile"
                                value="999999999"
                                onChange={(e) => handleFormData(e)}
                                autoComplete="Mobile"
                                required=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="Amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Amount
                        </label>
                        <div className="mt-2">
                            <input
                                id="Amount"
                                name="amount"
                                value="10"
                                autoComplete="Amount"
                                onChange={(e) => handleFormData(e)}
                                required=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="MUID"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            MUID
                        </label>
                        <div className="mt-2">
                            <input
                                id="MUID"
                                name="muid"
                                value="nuid-909090"
                                onChange={(e) => handleFormData(e)}
                                autoComplete="MUID"
                                required=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <button
                            onClick={(e) => makePayment(e)}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default BuyNow;
