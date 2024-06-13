import { useContext, useEffect, useState } from "react";
import myContext from "../Context/myContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from '../Redux/CartSlice';
import "../Style/ProductInfo.css";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');

    const { id } = useParams();

    // getProductData
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                console.log("Product Data: ", productTemp.data()); // Debugging log
                setProduct({ ...productTemp.data(), id: productTemp.id });
                setMainImage(productTemp.data().productImageUrl); // Set main image initially
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product data: ", error);
            setLoading(false);
        }
    };

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

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(99, Number(e.target.value)));
        setQuantity(value);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity(prev => Math.min(99, prev + 1));
    };

    useEffect(() => {
        getProductData();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        );
    }

    return (
        <div className="main-content min-h-screen">
            <section className="product-info-section">
                <div className="product-info-container">
                    {product ? (
                        <>
                            <div className="image-gallery">
                                {product?.imgurl1 && <img src={product.imgurl1} alt="Thumbnail" onClick={() => setMainImage(product.imgurl1)} />}
                                {product?.imgurl2 && <img src={product.imgurl2} alt="Thumbnail" onClick={() => setMainImage(product.imgurl2)} />}
                                {product?.imgurl3 && <img src={product.imgurl3} alt="Thumbnail" onClick={() => setMainImage(product.imgurl3)} />}
                                {product?.imgurl4 && <img src={product.imgurl4} alt="Thumbnail" onClick={() => setMainImage(product.imgurl4)} />}
                            </div>
                            <div className="product-image-container">
                                <div className="scrollable-images">
                                    <img className="product-image" src={mainImage} alt="Main" />
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="product-description-container">
                                    <h2 className="product-title">{product.title}</h2>
                                    <div className="product-rating">
                                        {[...Array(5)].map((star, index) => (
                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="star-icon" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="product-price">₹ {product.price}</p>
                                    <div className="product-description">
                                        <h2 className="description-title">Description:</h2>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="quantity-container">
                                        <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                                        <input type="number" className="quantity-input" value={quantity} onChange={handleQuantityChange} />
                                        <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                                    </div>
                                    <div className="cart-actions">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button onClick={() => deleteCart(product)} className="delete-cart-btn">Delete from cart</button>
                                        ) : (
                                            <button onClick={() => addCart(product)} className="add-cart-btn">Add to cart</button>
                                        )}
                                        <button className="buy-now-btn">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Product not found</p>
                    )}
                </div>
            </section>
        </div>  
    );
};

export default ProductInfo;
