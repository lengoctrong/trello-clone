import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  addNewBoard,
  addNewCard,
  addNewColumn,
  deleteColumn,
  fetchBoard,
  moveCardOtherColumn,
  moveCardSameColumn,
  moveColumn,
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
  dispatch(retrieveSuccess())
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

  dispatch(fetchBoard(res.data))
  dispatch(retrieveSuccess())
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
  if (type === 'moveColumn') {
    dispatch(moveColumn(updatedBoard))
  }

  if (type === 'updateBoard') {
    dispatch(setBoardDetails(updatedBoard))
  }
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

export const moveCardToDifferentColumnAPI = async (
  currentCardId,
  prevColumnId,
  currentColumnId,
  updatedColumns,
  dispatch
) => {
  let prevCardOrderIds =
    updatedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds || []

  if (
    prevCardOrderIds.length === 1 &&
    prevCardOrderIds[0].includes('placeholder-card')
  ) {
    prevCardOrderIds = []
  }

  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/supports/moving_card`,
    {
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      currentColumnId,
      currentCardOrderIds: updatedColumns.find((c) => c._id === currentColumnId)
        .cardOrderIds
    }
  )

  dispatch(
    moveCardOtherColumn({
      currentCardId,
      prevColumnId,
      currentColumnId,
      updatedColumns
    })
  )
}

export const updateColumnDetailsAPI = async (
  columnId,
  updatedColumn,
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}/${columnId}`,
    updatedColumn
  )
  dispatch(moveCardSameColumn({ columnId, updatedColumn }))
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
