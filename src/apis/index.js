import axios from 'axios'
import { isEmpty } from 'lodash'
import {
  addActivity,
  getAllActivities
} from '~/features/activity/activitySlice'
import {
  addNewBoard,
  addNewCard,
  addNewColumn,
  deleteBoard,
  moveCardToDifferentColumn,
  moveCardToSameColumn,
  retrieveSuccess,
  setBoardDetails,
  setBoardList,
  setColumnDetails,
  startRetrieve
} from '~/features/boards/boardSlice'
import { setCardDetails } from '~/features/cards/cardSlice'
import { logoutUser, setUserDetails } from '~/features/users/userSlice'
import { API_TYPES, API_URL, API_VERSION } from '~/utils/constants'
import { generatePlaceholderCard, mapOrderedArr } from '~/utils/formatters'

// [BOARD]
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
  return res.data
}

export const getBoardDetailsAPI = async (boardId, dispatch) => {
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
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/${boardId}`,
    updatedBoard
  )
  dispatch(setBoardDetails(updatedBoard))
}

export const deleteBoardDetailsAPI = async (boardId, dispatch) => {
  await axios.delete(`${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/${boardId}`)

  dispatch(deleteBoard(boardId))
}

export const moveCardToDifferentColumnAPI = async (updatedData, dispatch) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.BOARD}/supports/moving_card`,
    updatedData
  )
  dispatch(moveCardToDifferentColumn(updatedData))
}

// [COLUMN]
export const createNewColumnAPI = async (columnData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}`,
    columnData
  )
  dispatch(addNewColumn(res.data))
}

export const updateColumnDetailsAPI = async (
  columnId,
  updatedData,
  dispatch
) => {
  const res = await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}/${columnId}`,
    updatedData
  )
  dispatch(setColumnDetails(updatedData))
  return res.data
}

export const moveCardToSameColumnAPI = async (
  columnId,
  updatedData,
  dispatch
) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.COLUMN}/${columnId}`,
    updatedData
  )
  dispatch(moveCardToSameColumn({ columnId, updatedData }))
}

// [CARD]
export const createNewCardAPI = async (cardData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.CARD}`,
    cardData
  )
  dispatch(addNewCard(res.data))
}

export const updateCardDetailsAPI = async (cardId, updatedData, dispatch) => {
  await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.CARD}/${cardId}`,
    updatedData
  )
  dispatch(setCardDetails(updatedData))
}

// [USER]
export const verifyUserDetailsAPI = async (userData, dispatch) => {
  const res = await axios.post(
    `${API_URL}/${API_VERSION}/${API_TYPES.USER}`,
    userData
  )
  dispatch(setUserDetails(res.data))
  return res.data
}

export const updateUserDetailsAPI = async (userId, updatedData, dispatch) => {
  const res = await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.USER}/${userId}`,
    updatedData
  )
  dispatch(setUserDetails(updatedData))
  return res.data
}

export const logoutUserAPI = async (userId, updatedData, dispatch) => {
  const res = await axios.put(
    `${API_URL}/${API_VERSION}/${API_TYPES.USER}/${userId}`,
    updatedData
  )
  dispatch(logoutUser(updatedData))
  return res.data
}

// [ACTIVITY]
export const createNewActivityAPI = async (activity, dispatch) => {
  await axios.post(`${API_URL}/${API_VERSION}/${API_TYPES.ACTIVITY}`, activity)
  dispatch(addActivity(activity))
}

export const getAllActivitiesAPI = async (dispatch) => {
  const res = await axios.get(`${API_URL}/${API_VERSION}/${API_TYPES.ACTIVITY}`)
  dispatch(getAllActivities(res.data))
}
