
# README for GPTVAR Class

## Overview

`GPTVAR` creates the value that goes inside a variable through GPT. enabling the easy sending of prompts and receiving of responses. It is designed for use with the OpenAI API, specifically targeting the GPT-3.5 model by default, but can be configured for other models.

## Prerequisites

-   Node.js installed
-   An OpenAI API key

## Installation

```
npm install gpt-var
```

## Quick Start

To use the `GPTVAR` class, follow these steps:

1.  **Importing the Class** First, import the `GPTVAR` class into your TypeScript file:
    
    typescriptCopy code
    
    ```
    import GPTVAR from 'gpt-var';
    ``` 
    
3.  **Creating an Instance** Create an instance of the `GPTVAR` class by passing your OpenAI API key and optionally the model you want to use:
        [model name list](https://platform.openai.com/docs/models/overview)
    ```
    const gptVar = new GPTVAR('your-openai-api-key', 'model-name');
    ```

    
4.  **Sending a Prompt** To send a prompt to the model, call the `prompt` method with your message and the desired format. The `format` argument can be 'any', 'object', or 'array', depending on how you want to process the response.
    
    ```
    gptVar.prompt('Your prompt here', 'any').then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
    ```
    
5.  **Handling Responses** The `prompt` method returns a promise, which resolves to the response from the GPT model. You can process this response as needed in your application.

## Method

### `prompt(message:string, format:string)`
This method sends a message to the GPT model and expects a response in a specified format.

- **`messages`**: The input string to send to the GPT model.
- **`format`**: Defines the format of the expected response. Options include:
  - **`any`**: Returns a raw string. Useful when the response format is flexible or unknown.
  - **`object`**: Expects the response to be a JSON object. Ideal for structured data.
  - **`array`**: Expects the response to be a JSON array. Suitable for lists or sequences.

#### Example Usage:

1. **Format: `any`**
   - This format is the most flexible and will return the response as a raw string. It's useful when you don't need a structured response.
   - Example Usage:
     ```typescript
     gptVar.prompt('Tell me a joke', 'any').then(response => {
       console.log('Response:', response);
     });
     ```
   - Example Response:
     ```
     "Why don't scientists trust atoms? Because they make up everything!"
     ```

2. **Format: `object`**
   - This format is used when you expect the response to be a JSON object. The class will try to parse the response into an object.
   - Example Usage:
     ```typescript
     gptVar.prompt('Provide details about the Eiffel Tower', 'object').then(response => {
       console.log('Response:', response);
     });
     ```
   - Example Response:
     ```json
     {
       "name": "Eiffel Tower",
       "location": "Paris, France",
       "height": "300 meters"
     }
     ```

3. **Format: `array`**
   - Use this format when you expect the response to be a JSON array. This is useful for lists or multiple items.
   - Example Usage:
     ```typescript
     gptVar.prompt('List three famous scientists', 'array').then(response => {
       console.log('Response:', response);
     });
     ```
   - Example Response:
     ```json
     ["Albert Einstein", "Marie Curie", "Isaac Newton"]
     ```

These examples demonstrate how you can use the `prompt` method with different formats to handle various types of responses from the GPT model. Remember, the actual output will depend on how the GPT model interprets and responds to your prompt.

## Note

-   Ensure you have a valid OpenAI API key.
-   The default model is set to 'gpt-3.5-turbo', but you can specify other models as needed.
-   The response format can be adjusted based on your requirements.

## Support

For issues, bugs, or feature requests, please file an issue on the GitHub repository where this class is hosted.
