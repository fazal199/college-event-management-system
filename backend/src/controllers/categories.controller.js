
const ApiResponse = require("../lib/utils/apiResponse");
const tryCatchBlock = require("../lib/utils/tryCatchBlock")
const CategoryModel = require("../models/categories.model")
const mongoose = require("mongoose");

const getAllCategories = tryCatchBlock(async (req, res) => {
    const allCategories = await CategoryModel.find({});
    res.json(new ApiResponse(200, allCategories, "Categories Fetched!", "All Catgories Fetched!"))
})

const createCategory = tryCatchBlock(async (req, res) => {
    const { categoryname } = req.body;

    await CategoryModel.create({
        categoryname
    });

    res.json(new ApiResponse(200, [], "Categorie Created!", "Categorie has been Created!"))
})

const updateCategory = tryCatchBlock(async (req, res) => {
    const { categoryId, categoryname } = req.body;
    await CategoryModel.findByIdAndUpdate(new mongoose.Types.ObjectId(categoryId), {
        categoryname
    });
    res.json(new ApiResponse(200, [], "Categorie Updated!", "Categorie has been updated!"));
})

const deleteCategory = tryCatchBlock(async (req, res) => {
    const { categoryId } = req.params;
    await CategoryModel.findByIdAndDelete(new mongoose.Types.ObjectId(categoryId));

    res.json(new ApiResponse(200, [], "Categorie Deleted!", "Categorie has been Deleted!"))
})


module.exports = { getAllCategories,createCategory, updateCategory, deleteCategory }