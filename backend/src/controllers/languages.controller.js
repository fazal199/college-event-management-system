const ApiResponse = require("../lib/utils/apiResponse");
const tryCatchBlock = require("../lib/utils/tryCatchBlock");
const LanguageModel = require("../models/languages.model");
const mongoose = require("mongoose");

const getAllLanguages = tryCatchBlock(async (req, res) => {
    const allLanguages = await LanguageModel.find({});

    res.json(new ApiResponse(200, allLanguages, "Languages Fetched!", "All Languages Fetched!"))
}, "something went wrong while fetching languages | languages.controller.js -> getAllLanguages!")

const createLanugage = tryCatchBlock(async (req, res) => {
    const { languagename } = req.body;

    await LanguageModel.create({
        languagename
    });

    res.json(new ApiResponse(200, [], "Language Created!", "Language has been Created!"))
}, "something went wrong while creating language | languages.controller.js -> createLanugage!")


const updateLanguage = tryCatchBlock(async (req, res) => {
    const { languageId, languagename } = req.body;
    await LanguageModel.findByIdAndUpdate(new mongoose.Types.ObjectId(languageId), {
        languagename
    });
    res.json(new ApiResponse(200, [], "Language Updated!", "Language has been updated!"));
}, "something went wrong while updating language | languages.controller.js -> updateLanguage!")

const deleteLanguage = tryCatchBlock(async (req, res) => {
    const { languageId } = req.params;
    await LanguageModel.findByIdAndDelete(new mongoose.Types.ObjectId(languageId));
    res.json(new ApiResponse(200, [], "Language Deleted!", "Language has been Deleted!"))
}, "something went wrong while deleting language | languages.controller.js -> deleteLanguage!")


module.exports = {
    getAllLanguages, createLanugage, updateLanguage,
    deleteLanguage
}