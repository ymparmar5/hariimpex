import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../FireBase/FireBaseConfig";
import toast from "react-hot-toast";
import "../../Style/ProductDetail.css";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="product-detailspage">
            <div className="header">
                <h1 className="title">All Product</h1>
                <Link to={'/AddProductPage'}>
                    <button className="add-product-button">Add Product</button>
                </Link>
            </div>

            {loading && <Loader className="loader" />}

            <div className="table-container">
                <table className="product-table">
                    <tbody>
                        <tr>
                            <th>S.No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, imgurl1 } = item;
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>
                                        <div className="image-container">
                                            <img className="product-image" src={imgurl1} alt="" />
                                        </div>
                                    </td>
                                    <td>{title}</td>
                                    <td>₹{price}</td>
                                    <td>{category}</td>
                                    <td>{date}</td>
                                    <td onClick={() => navigate(`/update-product/${id}`)} className="edit-action">Edit</td>
                                    <td onClick={() => deleteProduct(id)} className="delete-action">Delete</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
