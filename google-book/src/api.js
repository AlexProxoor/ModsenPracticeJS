import axios from 'axios'
import { GOOGLE_BOOKS_API } from './constants'

export const searchBooks = async (query, categories, sort, apiKey, startIndex, maxResults) => {
  const categ_url = categories === 'all' ? '' : `+subject:${categories}`
  const sort_url = `&orderBy=${sort}`
 

  const url = `${GOOGLE_BOOKS_API}?q=${query}${categ_url}${sort_url}&key=${apiKey}&maxResults=${maxResults}&startIndex=${startIndex}`;

  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error(`HTTP status ${response.status}`)
    }
    return {
      items: response.data.items || [],
      totalItems: response.data.totalItems || 0,
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred')
  }
}
