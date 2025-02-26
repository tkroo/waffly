import fs from 'node:fs/promises';
const filePath = 'static/gamesdata/games.json';

export const load = async ({ }) => {
  const data = fs.readFile(filePath, 'utf-8');
  const fileData = await data;
  return {
    games: JSON.parse(fileData),
  };
};