// import fs from 'node:fs/promises';
// const filePath = 'static/gamesdata/games.json';

export const load = async ({ fetch }) => {

  const res = await fetch(`${process.env.URL}/.netlify/functions/read-json`);
  const data = await res.json();
  console.log('data: ', data);
  return { data: data };
};