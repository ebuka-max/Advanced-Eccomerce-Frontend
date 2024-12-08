import React, { useEffect, useState } from 'react'
import "./addProduct.scss"
import Loader from '../../loader/Loader'
import ProductForm from '../productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, RESET_PROD } from '../../../redux/features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    category: "",
    brand: "",
    quantity: "",
    color: "",
    price: "",
    regularPrice: "",
};

const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState(initialState)
    const [files, setFiles] = useState([])
    const [description, setDescription] = useState("")

    const { isLoading, message } = useSelector((state) => state.product)

    const { name, category, brand, quantity, color, price, regularPrice } = product

    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku
    }

    const saveProduct = async (e) => {
        e.preventDefault()

        if (files.length < 1) {
            return toast.error("Please adda an image ")
        }

        const formData = {
            name,
            sku: generateSKU(category),
            category,
            brand,
            color,
            quantity: Number(quantity),
            regularPrice,
            price,
            description,
            image: files
        }

        await dispatch(createProduct(formData))

        // navigate("/admin/all-products")
    }

    useEffect(() => {
        if (message === "Product created successfully") {
            navigate("/admin/all-products")
        }
        dispatch(RESET_PROD())
    }, [message, navigate, dispatch]);

    return (
        <section>
            <div className="container">
                {isLoading && <Loader />}
                <h3 className="--mt">Add New Product</h3>

                <ProductForm saveProduct={saveProduct}
                    product={product}
                    setProduct={setProduct}
                    isEditing={false}
                    description={description}
                    setDescription={setDescription}
                    files={files} setFiles={setFiles}
                />
            </div>
        </section>
    )
}

export default AddProduct