import { OpenAI } from "openai";
export default class GPTVAR {
    openai: OpenAI;
    model: string;
    constructor(apiKey: string, model?: string);
    prompt(messages: string, format?: string): Promise<any>;
    isValidFormat(format: string): boolean;
    formatMessage(message: string, format: string): string;
    sendRequest(message: string): Promise<OpenAI.Chat.Completions.ChatCompletion>;
    processResponse(response: any, format: string): any;
    extractAndParse(content: string, format: string): any;
}
