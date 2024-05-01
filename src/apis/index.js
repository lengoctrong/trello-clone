import axios from 'axios'
import {
  addNewColumn,
  fetchBoardError,
  fetchBoardStart,
  fetchBoardSuccess
} from '~/features/boards/boardSlice'
import { API_URL, API_VERSION, ITEM_TYPES } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId, dispatch) => {
  dispatch(fetchBoardStart())
  try {
    const res = await axios.get(
      `${API_URL}/${API_VERSION}/${ITEM_TYPES.BOARD}/${boardId}`
    )
    dispatch(fetchBoardSuccess(res.data))
  } catch (err) {
    dispatch(fetchBoardError())
  }
}

export const createNewColumnAPI = async (columnData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.COLUMN}`,
    columnData
  )
  dispatch(addNewColumn(res.data))
}

export const createNewCardAPI = async (cardData) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.CARD}`,
    cardData
  )
  return res.data
}
