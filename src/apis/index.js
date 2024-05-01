import axios from 'axios'
import { API_URL } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_URL}/v1/boards/${boardId}`)
  return res.data
}
