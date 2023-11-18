"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
class GPTVAR {
    constructor(apiKey, model = "gpt-3.5-turbo") {
        this.openai = new openai_1.OpenAI({ apiKey });
        this.model = model;
    }
    async prompt(messages, format = "any") {
        try {
            const formattedMessage = this.formatMessage(messages, format);
            const response = await this.sendRequest(formattedMessage);
            return this.processResponse(response, format);
        }
        catch (error) {
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
        var _a, _b, _c;
        const validFormats = ["any", "array", "object"];
        if (!validFormats.includes(format)) {
            throw new Error("Invalid format. Please use 'any', 'array', or 'object'.");
        }
        const content = (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : "";
        if (format === "any")
            return content;
        try {
            const contentObj = JSON.parse(content);
            return contentObj;
        }
        catch (_d) {
            return this.extractAndParse(content, format);
        }
    }
    extractAndParse(content, format) {
        const regex = format === "object" ? /{.*}/s : /\[.*\]/s;
        const match = content.match(regex);
        if (match) {
            try {
                return JSON.parse(match[0]);
            }
            catch (_a) {
                return false;
            }
        }
        return false;
    }
}
exports.default = GPTVAR;
