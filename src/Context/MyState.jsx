/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from "../FireBase/FireBaseConfig";
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // Products State
    const [getAllProduct, setGetAllProduct] = useState([]);

    // Fetch Products Function
    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
                // Log the products to the console
                console.log('Fetched Products:', productArray);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Error fetching products: ", error);
            setLoading(false);
        }
    }

    // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);

    // Fetch Orders Function
    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, 'order'), orderBy('time'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const orderArray = [];
                querySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    // Delete Order Function
    const OrderDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
            setLoading(false);
        } catch (error) {
            console.error('Error deleting order:', error);
            setLoading(false);
        }
    };

    // User State 
    const [getAllUser, setGetAllUser] = useState([]);

    // Fetch Users Function
    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, 'user'), orderBy('time'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const userArray = [];
                querySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrderFunction,
            getAllOrder,
            OrderDelete,
            getAllUser
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
