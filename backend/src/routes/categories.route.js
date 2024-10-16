const { Router } = require("express");
const { getAllCategories,deleteCategory,updateCategory,createCategory } = require("../controllers/categories.controller.js");

const categoriesRouter = Router();

categoriesRouter.get("/all",getAllCategories);
categoriesRouter.post("/create",createCategory);
categoriesRouter.put("/update",updateCategory);
categoriesRouter.delete("/delete/:categoryId",deleteCategory);


module.exports = categoriesRouter