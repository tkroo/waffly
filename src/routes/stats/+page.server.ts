// import fs from 'node:fs/promises';
// const filePath = 'static/gamesdata/games.json';

export const load = async ({ fetch }) => {
  // console.log(`process.env.URL: ${process.env.URL}`);
  // const res = await fetch(`${process.env.URL}/.netlify/functions/read-json`);
  const res = await fetch(`/.netlify/functions/read-json`);

  const data = await res.json();
  console.log('data: ', data);
  return { data: data };
};