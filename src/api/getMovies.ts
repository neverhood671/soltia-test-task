import fetchJSON from '../utils/fetchJSON';

const API_KEY = '906570ed';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

type MoviesResponse = {
  Response: 'True' | 'False',
  Search?: Movie[],
  Error?: string,
};
type Movie = {
  Title: string,
  Year: string,
};
const getMovies = async (query: string): Promise<string[]> => fetchJSON(`${API_URL}&s=${query}`)
  .then((res) => {
    const response = res as MoviesResponse;
    if (response.Response === 'True') {
      return Array.isArray(response?.Search)
        ? response.Search.map((movie) => `${movie.Title} (${movie.Year})`)
        : ['No results found'];
    }
    return [`API returns error: ${response?.Error || ''} Try another query.`];
  })
  .catch((err) => [err as string]);

export default getMovies;
