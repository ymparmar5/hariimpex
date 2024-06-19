/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from "../FireBase/FireBaseConfig";
import toast from 'react-hot-toast';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllProductFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching products: ", error);
            setLoading(false);
        }
    };

    const getAllOrderFunction = () => {
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
            return unsubscribe;
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const OrderDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setLoading(false);
        }
    };

    const getAllUserFunction = () => {
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
            return unsubscribe;
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribeProducts = getAllProductFunction();
        const unsubscribeOrders = getAllOrderFunction();
        const unsubscribeUsers = getAllUserFunction();

        return () => {
            if (unsubscribeProducts) unsubscribeProducts();
            if (unsubscribeOrders) unsubscribeOrders();
            if (unsubscribeUsers) unsubscribeUsers();
        };
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
