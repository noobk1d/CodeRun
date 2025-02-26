const express = require("express");
const AppError = require("../utils/appError");
const axios = require("axios");
const he = require("he");

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";
exports.getSupportedLanguages = async (req, res, next) => {
  console.log(10);
  try {
    const languages = await axios.get(
      "https://emkc.org/api/v2/piston/runtimes"
    );
    if (!languages.data) {
      throw new Error("No languages found");
    }
    res.json({ supported_languages: languages.data });
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch languages", details: error.message });
  }
};

exports.codeExecute = async (req, res, next) => {
  try {
    console.log(req.body);
    const { language, version, code } = req.body;
    const rawCode = he.decode(req.body.code); // Decodes HTML entities

    // Validate input
    if (!language || !version || !code) {
      return res
        .status(400)
        .json({ error: "Missing required fields: language, version, or code" });
    }
    const formattedRequest = {
      language,
      version,
      files: [
        {
          name: `main.${
            language === "cpp"
              ? "cpp"
              : language === "java"
              ? "java"
              : language === "js"
              ? "js"
              : "py"
          }`,
          content: rawCode,
        },
      ],
      stdin: "",
      args: [],
    };
    // Send request to Piston API
    const response = await axios.post(PISTON_API_URL, formattedRequest);

    // Respond with execution result
    return res.status(200).json({
      success: true,
      language: response.data.language,
      version: response.data.version,
      output: response.data.run.stdout.trim(),
      error: response.data.run.stderr.trim(),
      status_code: response.data.run.code,
    });
  } catch (error) {
    console.error("Error executing code:", error.message);
    // console.log(error);
    return res.status(500).json({
      success: false,
      error: "Code execution failed",
      details: error.message,
    });
  }
};
