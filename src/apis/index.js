import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  addNewBoard,
  addNewCard,
  addNewColumn,
  deleteColumn,
  moveCardToDifferentColumn,
  retrieveSuccess,
  setBoardDetails,
  setBoardList,
  startRetrieve
} from '~/features/boards/boardSlice'
import { API_TYPES, API_URL, API_VERSION } from '~/utils/constants'
import { generatePlaceholderCard, mapOrderedArr } from '~/utils/formatters'

export const getAllBoardAPI = async (dispatch) => {
  dispatch(startRetrieve())
  const result = await axios.get(`${API_URL}/${API_VERSION}/${API_TYPES.BOARD}`)
  dispatch(setBoardList(result.data))
}

export const createNewBoardAPI = async (boardData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}`,
    boardData
  )
  dispatch(addNewBoard(res.data))
}

export const fetchBoardDetailsAPI = async (boardId, dispatch) => {
  dispatch(startRetrieve())
  const res = await axios.get(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/${boardId}`
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

  dispatch(retrieveSuccess(board))
}

export const updateBoardDetailsAPI = async (
  boardId,
  updatedBoard,
  type,
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/${boardId}`,
    updatedBoard
  )
  dispatch(setBoardDetails(updatedBoard))
}

export const createNewColumnAPI = async (columnData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}`,
    columnData
  )
  dispatch(addNewColumn(res.data))
}

export const deleteColumnDetailsAPI = async (columnId, dispatch) => {
  dispatch(deleteColumn(columnId))

  return await axios.delete(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}/${columnId}`
  )
}

export const moveCardToSameColumnAPI = async (columnId, updatedData) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}/${columnId}`,
    updatedData
  )
}

export const moveCardToDifferentColumnAPI = async (updatedData, dispatch) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/supports/moving_card`,
    updatedData
  )
  dispatch(moveCardToDifferentColumn(updatedData))
}

export const createNewCardAPI = async (cardData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.CARD}`,
    cardData
  )
  dispatch(addNewCard(res.data))
}

export const updateAllCardsColumnIdAPI = async (columnId, updatedData) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.CARD}?columnId=${columnId}`,
    updatedData
  )
}

export const getAllCardsAPI = async (columnId) => {
  return await axios.get(
    `${API_URL}/${API_VERSION}/${API_TYPES.CARD}?columnId=${columnId}`
  )
}

export const createNewUserAPI = async (userData) => {
  return await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.USER}`,
    userData
  )
}
