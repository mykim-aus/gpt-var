const { OpenAI } = require("openai");

class GPTVAR {
  constructor(apiKey, model = "gpt-3.5-turbo") {
    this.openai = new OpenAI({ apiKey });
    this.model = model;
  }

  async prompt(messages, format = "any") {
    try {
      const formattedMessage = this.formatMessage(messages, format);
      const response = await this.sendRequest(formattedMessage);
      return this.processResponse(response, format);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  formatMessage(message, format) {
    return `${message}, When providing a response, use double quotes for strings and ensure the answer is in JavaScript ${format} format also answer only ${format} without variable name`;
  }

  async sendRequest(message) {
    return await this.openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: this.model,
    });
  }

  processResponse(response, format) {
    const content = response.choices[0]?.message?.content ?? "";
    if (format === "any") return content;

    try {
      const contentObj = JSON.parse(content);
      return contentObj;
    } catch {
      return this.extractAndParse(content, format);
    }
  }

  extractAndParse(content, format) {
    const regex = format === "object" ? /{.*}/s : /\[.*\]/s;
    const match = content.match(regex);

    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return false;
      }
    }
    return false;
  }
}

module.exports = GPTVAR;
