import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import "../../Style/AddProductPage.css";

const categoryList = [
  { name: 'select cat' },
  { name: 'Standee Display' },
  { name: 'Cooling Accs' },
  { name: 'Water Block' },
  { name: 'LED-Bord Profiles' },
  { name: 'Condenser' },
  { name: 'Aquarium Chiller' },
  { name: 'Uncategorized' }

];



const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

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

  const AddProductPageFunction = async () => {
    if (product.title === "" || product.price === "" || product.imgurl1 === "" || product.category === "" || product.description === "") {
      return toast.error("All fields are required");
    };

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate('/admin-dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  // const addPredefinedProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const productRef = collection(fireDB, 'products');
  //     for (const product of predefinedProducts) {
  //       await addDoc(productRef, product);
  //     }
  //     toast.success("Predefined products added successfully");
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     toast.error("Failed to add predefined products");
  //   }
  // };

  return (
    <div className="addproduct-container ">
      {loading && <Loader className="loader" />}
      <div className="add-product-form-wrapper">
        <div className="form-header">
          <h2>Add Product</h2>
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
            onClick={AddProductPageFunction}
            type="button"
            className="add-product-submit-btn"
          >
            Add Product
          </button>
        </div>
          {/* <div className="add-product-form-group">
                      <button
                          onClick={addPredefinedProducts}
                          type="button"
                          className="add-product-submit-btn"
                      >
                          Add Predefined Products
                      </button>
                  </div> */}
      </div>
    </div>
  );
};

export default AddProductPage;
