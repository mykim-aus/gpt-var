# README for GPTVAR

## Overview

`GPTVAR` facilitates easy communication with the OpenAI API, enabling the seamless sending of prompts and receiving of responses. Primarily designed for GPT-3.5, it can be adapted for other models, simplifying the creation of values for variables using GPT-generated content.

## Prerequisites

- Node.js
- An OpenAI API key

## Installation

Install `GPTVAR` using npm:

```bash
npm install gpt-var
```

## Quick Start

Utilize `GPTVAR` in a few simple steps:

1. **Import the Class**
   
   Begin by importing `GPTVAR` into your TypeScript file:

   ```typescript
   import GPTVAR from 'gpt-var';
   ```

2. **Create an Instance**
   
   Initialize `GPTVAR` with your OpenAI API key and, optionally, your preferred model. For a list of models, visit [OpenAI Models Overview](https://platform.openai.com/docs/models/overview).

   ```typescript
   const gptVar = new GPTVAR('your-openai-api-key', 'model-name');
   ```

3. **Send a Prompt**
   
   Call `prompt` with your message and the desired format. Formats can be 'any', 'array', 'object', or 'objectInArray'.

   ```typescript
   gptVar.prompt('Your prompt here', 'any').then(response => {
     console.log(response);
   }).catch(error => {
     console.error(error);
   });
   ```

4. **Handle Responses**
   
   `prompt` returns a promise with the GPT model's response, which you can then process as needed.

## Method

### `prompt(message: string, format: string)`

This method sends a message to the GPT model, expecting a response in the specified format.

- **`messages`**: The input string for the GPT model.
- **`format`**: The expected response format. Options:
  - **`any`**: Returns a raw string, suitable for flexible or unspecified formats.
  - **`object`**: Expects a JSON object, ideal for structured data.
  - **`array`**: Expects a JSON array, great for lists or sequences.
  - **`objectInArray`**: Expects an array of JSON objects, useful for structured lists.

#### Example Usage:

1. **Format: `any`**
   
   Returns the response as a raw string, ideal for unstructured data.

   ```typescript
   gptVar.prompt('Tell me a joke', 'any').then(response => {
     console.log('Response:', response);
   });
   ```

   Example Response:
   ```
   "Why don't scientists trust atoms? Because they make up everything!"
   ```

2. **Format: `object`**
   
   Expects a JSON object response.

   ```typescript
   gptVar.prompt('Provide details about the Eiffel Tower', 'object').then(response => {
     console.log('Response:', response);
   });
   ```

   Example Response:
   ```json
   {
     "name": "Eiffel Tower",
     "location": "Paris, France",
     "height": "300 meters"
   }
   ```

3. **Format: `array`**
   
   Expects a JSON array response.

   ```typescript
   gptVar.prompt('List three famous scientists', 'array').then(response => {
     console.log('Response:', response);
   });
   ```

   Example Response:
   ```json
   ["Albert Einstein", "Marie Curie", "Isaac Newton"]
   ```

4. **Format: `objectInArray`**
   
   Expects an array of JSON objects.

   ```typescript
    gptVar.prompt('List major cities with their countries and populations', 'objectInArray').then(response => {
      console.log('Response:', response);
    });
   ```

   Example Response:
   ```json
    [
      {
        "city": "New York City",
        "country": "USA",
        "population": "8.4 million"
      },
      {
        "city": "Tokyo",
        "country": "Japan",
        "population": "9.3 million"
      },
      {
        "city": "London",
        "country": "UK",
        "population": "8.9 million"
      }
    ]
   ```

## Notes

- Ensure your OpenAI API key is valid.
- Default model is 'gpt-3.5-turbo'; other models can be specified.
- Adjust the response format to meet your needs.

## Support

For support, issues, or feature requests, please file an issue on our GitHub repository.
