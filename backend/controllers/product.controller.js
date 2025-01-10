import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProducts = async (req, res) => {
    const product = req.body; //user will send this data

    if (!product || !product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save()
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try  {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    console.log("id", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("error in deleting product:", error.message);
        return res.status(500).json({ success: false, message: "Server Error"});
    }
};