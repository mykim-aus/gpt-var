import { OpenAI } from "openai";
class GPTVAR {
    constructor(apiKey, model = "gpt-3.5-turbo") {
        this.openai = new OpenAI({ apiKey });
        this.model = model;
    }
    async prompt(messages, format = "any") {
        try {
            if (!this.isValidFormat(format)) {
                throw new Error("Invalid format. Please use valid format.");
            }
            const formattedMessage = this.formatMessage(messages, format);
            const response = await this.sendRequest(formattedMessage);
            return this.processResponse(response, format);
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    isValidFormat(format) {
        const validFormats = ["any", "array", "object", "objectInArray"];
        return validFormats.includes(format);
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
            }
            catch (_a) {
                return false;
            }
        }
        return false;
    }
}
export default GPTVAR;
module.exports = GPTVAR;
