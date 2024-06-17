import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from './ProdcutDetail';
import OrderDetail from './OrderDetail';
import UserDetail from './UserDetail';
import myContext from '../../Context/myContext';
import '../../Style/AdminDashboard.css';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;

    return (
        <div className="dashboard-container">
            {/* Top */}
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </div>

            {/* Mid */}
            <div className="user-info">
                <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="User" />
                </div>
                <h1><span className="font-bold">Name: </span>{user?.name}</h1>
                <h1><span className="font-bold">Email: </span>{user?.email}</h1>
                <h1><span className="font-bold">Date: </span>{user?.date}</h1>
                <h1><span className="font-bold">Role: </span>{user?.role}</h1>
            </div>

            {/* Bottom */}
            <div className="tabs">
                <Tabs>
                    <TabList className="flex flex-wrap text-center justify-center">
                        <Tab className="tab">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket">
                                <path d="m5 11 4-7" />
                                <path d="m19 11-4-7" />
                                <path d="M2 11h20" />
                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                <path d="m9 11 1 9" />
                                <path d="M4.5 15.5h15" />
                                <path d="m15 11-1 9" />
                            </svg>
                            <h2>{getAllProduct.length}</h2>
                            <p>Total Products</p>
                        </Tab>
                        <Tab className="tab">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered">
                                <line x1={10} x2={21}
                                y1={6} y2={6} />
                                <line x1={10} x2={21} y1={12} y2={12} />
                                <line x1={10} x2={21} y1={18} y2={18} />
                                <path d="M4 6h1v4" />
                                <path d="M4 10h2" />
                                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                            </svg>
                            <h2>{getAllOrder.length}</h2>
                            <p>Total Orders</p>
                        </Tab>
                        <Tab className="tab">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx={9} cy={7} r={4} />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <h2>{getAllUser.length}</h2>
                            <p>Total Users</p>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ProductDetail />
                    </TabPanel>

                    <TabPanel>
                        <OrderDetail />
                    </TabPanel>

                    <TabPanel>
                        <UserDetail />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default AdminDashboard;
