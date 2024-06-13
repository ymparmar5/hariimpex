import { useNavigate } from "react-router-dom";
import myContext from "../Context/myContext";
import { useContext, useEffect } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../Redux/CartSlice";
import toast from "react-hot-toast";
import "../Style/HomeProductCard.css";  

const HomeProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="home-product-card">
            <div className="home-product-heading">
                <h1>Bestselling Products</h1>
            </div>
            <section className="home-product-section">
                <div className="home-product-container">
                    <div className="home-product-loader-container">{loading && <Loader />}</div>
                    <div className="home-product-grid">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="home-product-card-item">
                                    <div className="home-product-card-content" onClick={() => navigate(`/productinfo/${id}`)}>
                                        <img src={productImageUrl} alt="product" className="home-product-image" />
                                        <div className="home-product-details">
                                            <h2 className="home-product-brand">Hari impex</h2>
                                            <h1 className="home-product-title">{title.substring(0, 25)}</h1>
                                            <h1 className="home-product-price">₹{price}</h1>
                                            <div className="home-product-button-container">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button onClick={() => deleteCart(item)} className="home-product-delete-button">
                                                        Delete from cart
                                                    </button>
                                                ) : (
                                                    <button onClick={() => addCart(item)} className="home-product-add-button">
                                                        Add to cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeProductCard;
