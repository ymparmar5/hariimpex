import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { useContext, useEffect, useState } from "react";
import myContext from "../Context/myContext";
import { addToCart, deleteFromCart } from "../Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import '../Style/CategoryPage.css';

const CategoryPage = () => {
    const { categoryname } = useParams();
    const { getAllProduct, loading } = useContext(myContext); 
    const navigate = useNavigate();
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('');


    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));     
        toast.success("Removed from cart")
    }

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const categories = [
        'Standee Display', 'Cooling Accs', 'Water Block', 'LED-Bord Profiles', 'Condenser', 'Aquarium Chiller'
    ];

    return (
        <div className="category-main-content">
            <div className="category-sidebar">
                <h2>Categories</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => navigate(`/category/${category}`)}>{category}</li>
                    ))}
                </ul>
                <h2>Sort By</h2>
                <select onChange={handleSort} value={sortOption} className="shop-filter">
                    <option value="">Select</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="name-az">Name: A to Z</option>
                    <option value="name-za">Name: Z to A</option>
                </select>
            </div>
            <div className="category-products">
                <div className="category-header">
                    <h1>{categoryname}</h1>
                </div>
                {loading ? (
                    <div className="category-loader">
                        <Loader />
                    </div>
                ) : (
                    <div className="category-container">
                        <div className="category-grid">
                            {filterProduct.length > 0 ? (
                                filterProduct.map((item, index) => (
                                    <div key={index} className="category-card">
                                        <div className="category-card-content" onClick={() => navigate(`/productinfo/${item.id}`)}>
                                            <img src={item.imgurl1} alt="product" className="category-product-image" />
                                            <div className="category-product-details">
                                                <h2 className="category-product-brand">{item.category}</h2>
                                                <h1 className="category-product-title">{item.title.substring(0, 25)}</h1>
                                                <h1 className="category-product-price">₹{item.price}</h1>
                                                <div className="category-button-container">
                                                    {cartItems.some((p) => p.id === item.id) ? (
                                                        <button onClick={() => deleteCart(item)} className="category-delete-button">
                                                            Delete from cart
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => addCart(item)} className="category-add-button">
                                                            Add to cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="category-no-product">
                                    <img src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No product found" />
                                    <h1>No {categoryname} product found</h1>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
