import React, { useContext, useEffect } from "react";
import myContext from "../../Context/myContext";
import '../../Style/OrderDetail.css';

const OrderDetail = () => {
    const context = useContext(myContext);

    const { getAllOrder, getAllOrderFunction, OrderDelete } = context;
      
    useEffect(() => {
        getAllOrderFunction();
    }, []);


    return (
        <div className="order-container">
            <div className="order-header">
                <h1>All Orders</h1>
            </div>
            <div className="order-table-container">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Pincode</th>
                            <th>Mobile</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllOrder.length > 0 ? (
                            getAllOrder.map((order, index) => (
                                <React.Fragment key={order.id}>
                                    {order.items.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>{index + 1}</td>
                                            <td><img src={item.imgurl1} alt="img" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.category}</td>
                                            <td>₹{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price * item.quantity}</td>
                                            <td>{order.status}</td>
                                            <td>{order.name}</td>
                                            <td>{order.address}</td>
                                            <td>{order.pincode}</td>
                                            <td>{order.mobile}</td>
                                            <td>{order.date.toString()}</td>
                                            <td onClick={() => OrderDelete(order.id)} id="delete-button">Delete</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="16">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
