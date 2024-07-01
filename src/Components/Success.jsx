import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fireDB } from "../FireBase/FireBaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      const updateOrderStatus = async () => {
        try {
          const orderRef = doc(fireDB, "orders", orderId);
          await updateDoc(orderRef, { status: "complete" });
          toast.success("Order status updated to complete!");
        } catch (error) {
          console.error("Error updating document: ", error);
          toast.error("Failed to update order status. Please contact support.");
        }
      };

      updateOrderStatus();
    }
  }, [orderId]);

  return <div>Payment Successful!</div>;
};

export default Success;
