import React, { useState } from "react";
import axios from "axios";
import { fireDB } from "../FireBase/FireBaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
import sha256 from "crypto-js/sha256";

const BuyNow = () => {
  const [data, setData] = useState();

  console.log("@@@", import.meta.env.VITE_FIREBASE_TOKEN);
  const handleFormData = (e) => {
    // console.log(e.target.value);
    const dd = { ...data, [e.target.name]: e.target.value };
    setData(dd);
  };

  const makePayment = async (e) => {
    e.preventDefault();

    const payload = {
      merchantId: "M22EJDYBLPU2G", //env
      merchantTransactionId: uuidv4(),
      merchantUserId: "test1314", //userId
      amount: 100, //from cart total
      redirectUrl: "https://webhook.site/redirect-url", // your url
      redirectMode: "REDIRECT",
      callbackUrl: "https://webhook.site/2e6bdb93-1f2e-40f5-bf47-93a466f953c1", //not needed
      mobileNumber: "8153843002", //cart
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const saltKey = import.meta.env.VITE_SALT_KEY;
    console.log("saltKey", saltKey);
    const saltIndex = "1"; //env

    const base64 = btoa(JSON.stringify(payload));
    console.log("object :>> ", base64);

    const url = base64 + "/pg/v1/pay" + saltKey;
    const sha = await sha256(url);

    const checksum1 = sha + "###" + "1";

    const finalChecksum = `${checksum1}`;

    const data = { base64, finalChecksum };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/checkout`, data);

    const redirecturl = res.data.data.instrumentResponse.redirectInfo.url;

    window.location.href = redirecturl;
  };

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
  );
};

export default BuyNow;
