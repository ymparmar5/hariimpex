import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import myContext from "../Context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../FireBase/FireBaseConfig";
import Loader from "../Components/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "../Style/SignIn.css";

const SignIN = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };

    return (
        <div id="sign-in">
            {loading && <Loader />}

            <div id="signin-form">
                <h3 id="signin-title">Sign In</h3>

                <input
                    type="email"
                    name="email"
                    autoComplete="on"

                    placeholder='Email Address'
                    value={userLogin.email}
                    onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            email: e.target.value
                        });
                    }}
                    className='signin-input'
                />

                <div className='password-input-container'>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        autoComplete="on"
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            });
                        }}
                        className='signin-input'
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className='password-toggle-icon'
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>

                <div id="signin-btn">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                    >
                        Sign In
                    </button>
                </div>
                <div className='signin-text'>
                    <p>Don't Have an account <b><Link className='signin-text' to={'/sign-up'}>Sign up</Link></b></p>
                </div>
            </div>
        </div>
    );
}

export default SignIN;
