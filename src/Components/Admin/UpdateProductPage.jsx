import { Timestamp, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../FireBase/FireBaseConfig";
import toast from "react-hot-toast";
import Loader from "../Loader";
import myContext from "../../Context/myContext";
import "../../Style/AddProductPage.css";

const categoryList = [
    { name: 'select cat' },
    { name: 'Standee Display' },
    { name: 'cooling accessories' },
    { name: 'Water Block' },
    { name: 'LED Bord Profiles' },
    { name: 'Condenser & heat Sinks' },
    { name: 'Aquarium Chiller' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        salePrice: "",
        imgurl1: "",
        imgurl2: "",
        imgurl3: "",
        imgurl4: "",
        category: "",
        description: "",
        stars: "",
        stock: true,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const productData = productTemp.data();
            setProduct({
                ...productData,
                date: productData?.date,
                time: productData?.time,
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="addproduct-container">
            {loading && <Loader className="loader" />}
            <div className="add-product-form-wrapper">
                <div className="form-header">
                    <h2>Update Product</h2>
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder="Product Title"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="salePrice"
                            value={product.salePrice}
                            onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
                            placeholder="Sale Price"
                        />
                    </div>
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="imgurl1"
                            value={product.imgurl1}
                            onChange={(e) => setProduct({ ...product, imgurl1: e.target.value })}
                            placeholder="Product Image Url"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="imgurl1"
                            value={product.imgurl1}
                            onChange={(e) => setProduct({ ...product, imgurl1: e.target.value })}
                            placeholder="Additional Image Url 1"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="imgurl2"
                            value={product.imgurl2}
                            onChange={(e) => setProduct({ ...product, imgurl2: e.target.value })}
                            placeholder="Additional Image Url 2"
                        />
                    </div>
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="imgurl3"
                            value={product.imgurl3}
                            onChange={(e) => setProduct({ ...product, imgurl3: e.target.value })}
                            placeholder="Additional Image Url 3"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="text"
                            name="imgurl4"
                            value={product.imgurl4}
                            onChange={(e) => setProduct({ ...product, imgurl4: e.target.value })}
                            placeholder="Additional Image Url 4"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="add-product-form-group">
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Product Description"
                        rows="5"
                    />
                </div>
                <div className="add-product-form-row">
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="stars"
                            value={product.stars}
                            onChange={(e) => setProduct({ ...product, stars: e.target.value })}
                            placeholder="Stars"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                            placeholder="Stock"
                        />
                    </div>
                </div>
                <div className="add-product-form-group">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="add-product-submit-btn"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
