import { promises as fs } from 'fs'; // Node.js file system module
import path from 'path';

exports.handler = async function(event, context) {
  try {
    const filePath = path.join(__dirname, '../../../../../static/gamesdata.json'); // Path to your data.json file (relative to the function)
    const dataBuffer = await fs.readFile(filePath);
    const data = JSON.parse(dataBuffer.toString());
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read JSON file.' }),
    };
  }
};

  