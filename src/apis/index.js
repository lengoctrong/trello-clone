import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  addNewCard,
  addNewColumn,
  fetchBoardError,
  fetchBoardStart,
  fetchBoardSuccess,
  moveCardSameColumn,
  moveColumn
} from '~/features/boards/boardSlice'
import { API_URL, API_VERSION, ITEM_TYPES } from '~/utils/constants'
import { generatePlaceholderCard, mapOrderedArr } from '~/utils/formatters'

export const fetchBoardDetailsAPI = async (boardId, dispatch) => {
  dispatch(fetchBoardStart())
  try {
    const res = await axios.get(
      `${API_URL}/${API_VERSION}/${ITEM_TYPES.BOARD}/${boardId}`
    )
    const board = res.data
    board.columns = mapOrderedArr(board.columns, board.columnOrderIds, '_id')
    board.columns.forEach((column) => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      }
      column.cards = mapOrderedArr(column.cards, column.cardOrderIds, '_id')
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

export const updateColumnDetailsAPI = async (
  columnId,
  updatedColumn,
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.COLUMN}/${columnId}`,
    updatedColumn
  )
  dispatch(moveCardSameColumn({ columnId, updatedColumn }))
}

export const createNewCardAPI = async (cardData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${ITEM_TYPES.CARD}`,
    cardData
  )
  dispatch(addNewCard(res.data))
}
