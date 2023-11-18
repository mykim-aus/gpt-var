import express from "express";
import bodyParser from "body-parser";
import GPTVAR from "gpt-var";
import "dotenv/config";

// const express = require("express");
// const bodyParser = require("body-parser");
// const GPTVAR = require("gpt-var");
// console.log(GPTVAR);
// require("dotenv").config();

const app = express();
const port = 3030;

const gpt = new GPTVAR(process.env.OPENAI_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getArray", async (req, res) => {
  try {
    const response = await gpt.prompt("create 3 english words", "list");

    res.send(`OpenAI Response: ${JSON.stringify(response)}`);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getJson", async (req, res) => {
  try {
    const response = await gpt.prompt(
      `please dummy userData object which has "name" and "age" keys`,
      "object"
    );

    res.send(`OpenAI Response: ${JSON.stringify(response)}`);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
