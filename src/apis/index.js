import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  addNewCard,
  addNewColumn,
  fetchBoardError,
  fetchBoardStart,
  fetchBoardSuccess,
  moveColumn
} from '~/features/boards/boardSlice'
import { API_URL, API_VERSION, ITEM_TYPES } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'

export const fetchBoardDetailsAPI = async (boardId, dispatch) => {
  dispatch(fetchBoardStart())
  try {
    const res = await axios.get(
      `${API_URL}/${API_VERSION}/${ITEM_TYPES.BOARD}/${boardId}`
    )

    res.data.columns.forEach((column) => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      }
    })

    dispatch(fetchBoardSuccess(res.data))
  } catch (err) {
    dispatch(fetchBoardError())
  }
}

export const updateBoardDetailsAPI = async (
  boardId,
  updatedBoard,
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.BOARD}/${boardId}`,
    updatedBoard
  )
  dispatch(moveColumn(updatedBoard))
}

export const createNewColumnAPI = async (columnData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.COLUMN}`,
    columnData
  )
  dispatch(addNewColumn(res.data))
}

export const createNewCardAPI = async (cardData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.CARD}`,
    cardData
  )
  dispatch(addNewCard(res.data))
}
