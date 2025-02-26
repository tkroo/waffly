import { json, type RequestHandler } from '@sveltejs/kit';
import fs from 'node:fs/promises';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const filePath = 'static/gamesdata/games.json'; // Define the path where the file will be saved

    try {
      let existingData = await fs.readFile(filePath, 'utf-8');
      let newData = JSON.parse(existingData);
      if(!newData.map((gamedata: { words: string[]; rot13string: string; }) => gamedata.rot13string).includes(data.rot13string)) {
        newData.push(data);
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8');
        return json({ message: 'Data written to file successfully!' }, { status: 200 });
      } else {
        return json({ message: 'rot13string already exists' }, { status: 200 });
      }
    } catch (error) {
         console.error('Error writing to file:', error);
         return json({ message: 'Failed to write data to file.' }, { status: 500 });
    }
};