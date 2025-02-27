// netlify/functions/write-json.js

import { promises as fs } from 'fs'; // Node.js file system module
import path from 'path';

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body); // Parse the data sent from Svelte
    console.log('data: ', data);

    // **Security Note:** In a real application, you MUST validate and sanitize 'data' here
    // to prevent malicious input from being written to your JSON file.

    // const filePath = path.join(__dirname, '../../../../../static/gamesdata.json'); // Path to your data.json file (relative to the function)
    const filePath = '/gamesdata.json'; // Path to your data.json file (relative to the function)

    // 1. Read existing JSON:
    const existingDataBuffer = await fs.readFile(filePath);
    const existingData = JSON.parse(existingDataBuffer.toString());

    // 2. Update the JSON data:
    existingData.games.push(data); // Assuming you want to add new items to an 'items' array

    // 3. Write the updated JSON back to the file:
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2)); // 'null, 2' for pretty formatting

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data written to JSON file successfully!' }),
    };

  } catch (error) {
    console.error("Error writing to JSON:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to write to JSON file' }),
    };
  }
};