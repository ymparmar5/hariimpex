import React, { useContext } from "react";
import myContext from "../Context/myContext";
import OrderDetail from "../Components/Admin/OrderDetail"
import '../Style/UserDashboard.css';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <div className="main-content">
            <div className="container">
                {/* Top Section */}
                <div className="top">
                    {/* User Info */}
                    <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User Avatar" />
                    <h1>Name: {user?.name}</h1>
                    <h1>Email: {user?.email}</h1>
                    <h1>Date: {user?.date}</h1>
                    <h1>Role: {user?.role}</h1>
                </div>

                {/* Bottom Section */}
                <div className="bottom">
                    <h2>Order Details</h2>
                    {loading && <div>Loading...</div>}
                    <div className="order-container">
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                            <div key={index} className="order-item">
                                {order.cartItems.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row">
                                        <div className="left">
                                            <div className="info">
                                                <div className="item">
                                                    <span>Order Id</span>
                                                    <div>#{item.id}</div>
                                                </div>
                                                <div className="item">
                                                    <span>Date</span>
                                                    <div>{item.date}</div>
                                                </div>
                                                <div className="item">
                                                    <span>Total Amount</span>
                                                    <div>₹{item.price * item.quantity}</div>
                                                </div>
                                                <div className="item">
                                                    <span>Order Status</span>
                                                    <div>{order.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="details">
                                                <img src={item.imgurl1} alt={item.title} />
                                                <div className="description">
                                                    <p>{item.title}</p>
                                                    <p>{item.category}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p className="price">Price: ₹{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
