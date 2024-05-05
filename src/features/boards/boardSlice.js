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
    retrieveSuccess: (state) => {
      state.isPending = false
      state.isSuccess = true
    },
    fetchBoard: (state, action) => {
      state = { ...state, ...action.payload }

      if (!state.boards.find((board) => board._id === action.payload._id)) {
        state.boards = [...state.boards, action.payload]
      }

      return state
    },
    setBoardDetails: (state, action) => {
      return action.payload
    },
    setBoardList: (state, action) => {
      state.boards = [...action.payload]
    },
    addNewBoard: (state, action) => {
      state.boards = [...state.boards, action.payload]
    },
    setColumnDetails: (state, action) => {
      const column = state.columns.find((c) => c._id === action.payload._id)
      column.cards = action.payload.newColumn.cards
      column.cardOrderIds = action.payload.newColumn.cardOrderIds
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
    moveColumn: (state, action) => {
      state.columnOrderIds = action.payload.columnOrderIds
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
    moveColumnAndUpdateCards: (state, action) => {
      // columnId, oldBoardId, newBoardId
      const oldBoard = state.boards.find(
        (b) => b._id === action.payload.oldBoardId
      )

      const oldColumn = oldBoard.columns.find(
        (c) => c._id === action.payload.columnId
      )

      oldBoard.columns = oldBoard.columns.filter((c) => c._id !== oldColumn._id)

      oldBoard.columnOrderIds = oldBoard.columnOrderIds.filter(
        (id) => id !== oldColumn._id
      )

      const newBoard = state.boards.find(
        (b) => b._id === action.payload.newBoardId
      )

      oldColumn.boardId = newBoard._id

      oldColumn.cards.forEach((card) => {
        card.boardId = newBoard._id
      })

      newBoard.columns = [...newBoard.columns, oldColumn]
    }
  }
})

export default boardSlice.reducer
export const {
  startRetrieve,
  retrieveSuccess,
  fetchBoard,
  setBoardDetails,
  setBoardList,
  addNewBoard,
  setColumnDetails,
  addNewCard,
  addNewColumn,
  moveColumn,
  deleteColumn,
  setCurrentBoard,
  moveColumnAndUpdateCards
} = boardSlice.actions
