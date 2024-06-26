// Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Success = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        toast.success('Payment successful!');
        navigate('/'); // Redirect to the home or another relevant page after showing the toast
    }, [navigate]);

    return <div>Payment Successful!</div>;
};

export default Success;
