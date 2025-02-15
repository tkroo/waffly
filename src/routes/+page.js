export const load = ({ url }) => {
  console.log('+++++', url.searchParams.get('p'));
  return {
    puzzle: url.searchParams.get('p'),
  };
};