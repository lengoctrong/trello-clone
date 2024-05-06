import { createSlice } from '@reduxjs/toolkit'
import { generatePlaceholderCard } from '~/utils/formatters'

const initialState = {
  _id: '',
  title: '',
  description: '',
  slug: '',
  columnOrderIds: [],
  columns: [],
  createdAt: null,
  updatedAt: null,
  _destroy: false,
  isPending: false,
  isSuccess: false,
  boards: [],
  currentBoard: {}
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startRetrieve: (state) => {
      state.isPending = true
      state.isSuccess = false
    },
    retrieveSuccess: (state, action) => {
      state = { ...state, ...action.payload }

      state.isPending = false
      state.isSuccess = true

      return state
    },

    setBoardDetails: (state, action) => {
      return { ...state, ...action.payload }
    },
    setBoardList: (state, action) => {
      state.boards = action.payload
      state.isPending = false
      state.isSuccess = true
    },
    addNewBoard: (state, action) => {
      state.boards = [...state.boards, action.payload]
    },

    addNewColumn: (state, action) => {
      const newColumn = action.payload
      newColumn.cards = [generatePlaceholderCard(newColumn)]
      newColumn.cardOrderIds = [newColumn.cards[0]._id]

      state.columns = [...state.columns, newColumn]
      state.columnOrderIds = [...state.columnOrderIds, newColumn._id]
    },

    addNewCard: (state, action) => {
      const newCard = action.payload

      const column = state.columns.find(
        (column) => column._id === newCard.columnId
      )
      if (column.cards.some((card) => card.fe_placeholderCard)) {
        column.cards = [newCard]
        column.cardOrderIds = [newCard._id]
        return
      }
      column.cards.push(newCard)
      column.cardOrderIds.push(newCard._id)
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter((c) => c._id !== action.payload)
      state.columnOrderIds = state.columnOrderIds.filter(
        (id) => id !== action.payload
      )
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload
    },
    moveCardToDifferentColumn: (state, action) => {
      const prevColumn = state.columns.find(
        (c) => c._id === action.payload.prevColumnId
      )

      const currentColumn = state.columns.find(
        (c) => c._id === action.payload.currentColumnId
      )
      const card = prevColumn.cards.find(
        (card) => card._id === action.payload.currentCardId
      )

      prevColumn.cards = prevColumn.cards.filter(
        (card) => card._id !== action.payload.currentCardId
      )
      prevColumn.cardOrderIds = action.payload.prevCardOrderIds

      currentColumn.cards.push(card)
      currentColumn.cardOrderIds = action.payload.currentCardOrderIds

      card.columnId = action.payload.currentColumnId
    }
  }
})

export default boardSlice.reducer
export const {
  startRetrieve,
  retrieveSuccess,
  setBoardDetails,
  setBoardList,
  addNewBoard,
  addNewCard,
  addNewColumn,
  deleteColumn,
  setCurrentBoard,
  moveCardToDifferentColumn
} = boardSlice.actions
