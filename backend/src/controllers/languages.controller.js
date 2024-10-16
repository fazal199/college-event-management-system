const ApiResponse = require("../lib/utils/apiResponse");
const tryCatchBlock = require("../lib/utils/tryCatchBlock");
const LanguageModel = require("../models/languages.model");
const mongoose = require("mongoose");

const getAllLanguages = tryCatchBlock(async (req, res) => {
    const allLanguages = await LanguageModel.find({});

    res.json(new ApiResponse(200, allLanguages, "Languages Fetched!", "All Languages Fetched!"))
})

const createLanugage = tryCatchBlock(async (req, res) => {
    const { languagename } = req.body;

    await LanguageModel.create({
        languagename
    });

    res.json(new ApiResponse(200, [], "Language Created!", "Language has been Created!"))
})


const updateLanguage = tryCatchBlock(async (req, res) => {
    const { languageId, languagename } = req.body;
    await LanguageModel.findByIdAndUpdate(new mongoose.Types.ObjectId(languageId), {
        languagename
    });
    res.json(new ApiResponse(200, [], "Language Updated!", "Language has been updated!"));
})

const deleteLanguage = tryCatchBlock(async (req, res) => {
    const { languageId } = req.params;
    await LanguageModel.findByIdAndDelete(new mongoose.Types.ObjectId(languageId));
    res.json(new ApiResponse(200, [], "Language Deleted!", "Language has been Deleted!"))
})


module.exports = {
    getAllLanguages, createLanugage, updateLanguage,
    deleteLanguage
}