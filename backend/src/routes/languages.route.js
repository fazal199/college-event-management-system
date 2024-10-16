const { Router } = require("express");
const { getAllLanguages, updateLanguage,deleteLanguage,createLanugage } = require("../controllers/languages.controller.js");

const languagesRouter = Router();

languagesRouter.get("/all", getAllLanguages);
languagesRouter.post("/create",createLanugage);
languagesRouter.put("/update", updateLanguage);
languagesRouter.delete("/delete/:languageId", deleteLanguage);

module.exports = {
    languagesRouter
}
