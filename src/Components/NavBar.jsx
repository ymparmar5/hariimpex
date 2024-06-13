import { Link, useNavigate } from "react-router-dom";
import "../Style/NavBar.css";
import { useSelector } from "react-redux";


const NavBar = () => {
    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/sign-in")
    }

    const cartItems = useSelector((state) => state.cart);


    return (
  
        <nav >
            <menu >
                {/* Home */}
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                {/* All Product */}
                <li>
                    <Link to={'/shop'}>Shop</Link>
                </li>
                {/* Signup */}
                {!user ? <li>
                    <Link to={'/sign-up'}>Signup</Link>
                </li> : ""}
                {/* Signup */}
                {!user ? <li>
                    <Link to={'/sign-in'}>Signin</Link>
                </li> : ""}
                {/* User */}
                {user?.role === "user" && <li>
                    <Link to={'/user-dashboard'}>{user?.name}</Link>
                </li>}
                {/* Admin */}
                {user?.role === "admin" && <li>
                    <Link to={'/admin-dashboard'}>{user?.name}</Link>
                </li>}
                {/* logout */}
                {user && <li className=" cursor-pointer" onClick={logout}>
                    logout
                </li>}
                {/* Cart */}
                <li>
                    <Link to={'/cart'}>cart({cartItems.length})
                    </Link>
                </li>
            </menu>
        </nav>
    );
}

export default NavBar;