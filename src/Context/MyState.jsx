import { useState, useEffect } from 'react';
import myContext from '../Context/myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, addDoc, limit, getDocs } from 'firebase/firestore';
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
            const q = query(collection(fireDB, 'orders'), orderBy('time') );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const orderArray = [];
                querySnapshot.forEach((doc) =>  {
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
            await deleteDoc(doc(fireDB, 'orders', id));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setLoading(false);
        }
    };

    const addOrder = async (orderDetails) => {
        try {
            await addDoc(collection(fireDB, 'orders'), orderDetails);
            const ordersQuery = query(collection(fireDB, 'orders'), orderBy('time', 'desc'), limit(10));
            const querySnapshot = await getDocs(ordersQuery);
            const orderArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setGetAllOrder(orderArray);
            toast.success('Order added successfully');
        } catch (error) {
            console.error('Error adding order:', error);
            toast.error('Failed to add order');
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

    const addUser = async (user) => {
        try {
            await addDoc(collection(fireDB, 'user'), user);
            toast.success('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user');
        }
    };
    const deleteUser = async (uid) => {
        try {
            await deleteDoc(doc(fireDB, 'user', uid));
            toast.success('User deleted successfully');
            getAllUserFunction(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };

    // const updateUserRole = async (user, newRole) => {
    //     try {
    //         await updateDoc(doc(fireDB, 'user', user.uid), { role: newRole });
    //         toast.success('User role updated successfully');
    //         getAllUserFunction(); // Refresh the user list
    //     } catch (error) {
    //         console.error('Error updating user role:', error);
    //         toast.error('Failed to update user role');
    //     }
    // };

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
        <myContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrderFunction,
            getAllOrder,
            OrderDelete,
            getAllUser,
            addOrder,
            addUser,
            // deleteUser,
            // updateUserRole
        }}>
            {children}
        </myContext.Provider>
    );
}

export default MyState;
