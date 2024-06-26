// Fail.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Fail = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        toast.error('Payment failed. Please try again.');
        navigate('/cart'); // Redirect to the cart page or another relevant page after showing the toast
    }, [navigate]);

    return <div>Payment Failed!</div>;
};

export default Fail;
