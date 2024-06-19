import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import myContext from '../Context/myContext';
import { addToCart, deleteFromCart } from '../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../Style/Shop.css';
import toast from 'react-hot-toast';

const Shop = () => {
    const navigate = useNavigate();
    const { getAllProduct, loading } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('');
    const productsPerPage = 6; // 3 columns, 2 rows

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success('Added to cart');
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success('Removed from cart');
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const sortedProducts = [...getAllProduct].sort((a, b) => {
        if (sortOption === 'price-low-high') {
            return a.price - b.price;
        } else if (sortOption === 'price-high-low') {
            return b.price - a.price;
        } else if (sortOption === 'name-az') {
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'name-za') {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalProducts = getAllProduct.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const categories = [
        'Standee Display', 'Cooling Accs', 'Water Block', 'LED-Bord Profiles', 'Condenser', 'Aquarium Chiller'
    ];

    return (
        <div className="shop-main-content">
            <div className="shop-sidebar">
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
            <div className="shop-products">
                <div className="shop-header">
                    <h1>All Products</h1>
                </div>
                <div className="shop-container">
                    <div className="shop-grid">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            currentProducts.map((item, index) => (
                                <div key={index} className="shop-card">
                                    <div className="shop-card-content" onClick={() => navigate(`/productinfo/${item.id}`)}>
                                        <img src={item.imgurl1} alt="product" className="shop-product-image" />
                                        <div className="shop-product-details">
                                            <h2 className="shop-product-brand">{item.category}</h2>
                                            <h1 className="shop-product-title">{item.title.substring(0, 25)}</h1>
                                            <h1 className="shop-product-price">₹{item.price}</h1>
                                            <div className="shop-button-container">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button onClick={() => deleteCart(item)} className="shop-delete-button">
                                                        Delete from cart
                                                    </button>
                                                ) : (
                                                    <button onClick={() => addCart(item)} className="shop-add-button">
                                                        Add to cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="shop-pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
