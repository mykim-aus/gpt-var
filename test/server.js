import express from "express";
import bodyParser from "body-parser";
import GPTVAR from "gpt-var";
import "dotenv/config";
// const express = require("express");
// const bodyParser = require("body-parser");
// const GPTVAR = require("gpt-var");
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
    res.status(500).send("Error communicating with OpenAI");
  }
});

app.get("/getJson", async (req, res) => {
  try {
    const response = await openaiService.prompt(
      `please dummy userData object which has "name" and "age" keys`,
      "object"
    );

    console.log(response);

    res.send(`OpenAI Response: ${JSON.stringify(response)}`);
  } catch (error) {
    res.status(500).send("Error communicating with OpenAI");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
