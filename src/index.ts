import { OpenAI } from "openai";

class GPTVAR {
  openai: OpenAI;
  model: string;

  constructor(apiKey: string, model: string = "gpt-3.5-turbo") {
    this.openai = new OpenAI({ apiKey });
    this.model = model;
  }

  async prompt(messages: string, format: string = "any"): Promise<any> {
    try {
      if (!this.isValidFormat(format)) {
        throw new Error("Invalid format. Please use valid format.");
      }

      const formattedMessage = this.formatMessage(messages, format);
      const response = await this.sendRequest(formattedMessage);
      return this.processResponse(response, format);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  isValidFormat(format: string): boolean {
    const validFormats = ["any", "array", "object", "objectInArray"];
    return validFormats.includes(format);
  }

  formatMessage(message: string, format: string): string {
    return `${message}, When providing a response, use double quotes for strings and ensure the answer is in JavaScript ${format} format also answer only ${format} without variable name`;
  }

  async sendRequest(message: string) {
    return await this.openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: this.model,
    });
  }

  processResponse(response: any, format: string): any {
    const content = response.choices[0]?.message?.content ?? "";
    if (format === "any") return content;

    try {
      const contentObj = JSON.parse(content);
      return contentObj;
    } catch {
      return this.extractAndParse(content, format);
    }
  }

  extractAndParse(content: string, format: string): any {
    let regex;

    switch (format) {
      case "object":
        regex = /{.*}/s;
        break;
      case "array":
        regex = /\[.*\]/s;
        break;
      case "objectInArray":
        regex = /\[{.*}\]/s;
        break;
      default:
        return false;
    }

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

export default GPTVAR;

if (typeof module !== "undefined" && module.exports) {
  module.exports = GPTVAR;
}
