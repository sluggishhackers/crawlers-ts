const API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.GOOGLE_CX;

export const customSearch = async (params: { query: string }) => {
  return fetch(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&q=${params.query}&cx=${CX}`
  ).then((res) => res.json());
};
