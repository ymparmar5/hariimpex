import React, { useContext } from "react";
import myContext from "../../Context/myContext";
import '../../Style/OrderDetail.css'; // Import the custom CSS file

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, OrderDelete } = context;

    return (
        <div className="order-container">
            <div className="order-header">
                <h1>All Order</h1>
            </div>
            <div className="order-table-container">
                <table className="order-table">
                    <tbody>
                        <tr>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                        </tr>
                        {getAllOrder.map((order) => (
                            <React.Fragment key={order.id}>
                                {order.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td><img src={item.imgurl1} alt="img" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>₹{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{item.price * item.quantity}</td>
                                        <td>{order.status}</td>
                                        <td>{order.addressInfo.name}</td>
                                        <td>{order.addressInfo.address}</td>
                                        <td>{order.addressInfo.pincode}</td>
                                        <td>{order.addressInfo.mobileNumber}</td>
                                        <td>{order.email}</td>
                                        <td>{order.date}</td>
                                        <td onClick={() => OrderDelete(order.id)} className="delete-button">Delete</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
