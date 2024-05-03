import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  title: '',
  slug: '',
  columnOrderIds: [],
  columns: [],
  createdAt: null,
  updatedAt: null,
  _destroy: false,
  isPending: false,
  isSuccess: false,
  boards: []
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
      state = { ...state, ...action.payload }
    },
    setBoardList: (state, action) => {
      state.boards = [...action.payload]
    },
    addNewBoard: (state, action) => {
      state.boards = [...state.boards, action.payload]
    },
    addNewColumn: (state, action) => {
      state.columns = [...state.columns, action.payload]
      state.columnOrderIds = [...state.columnOrderIds, action.payload._id]
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
      state.columnOrderIds = [...action.payload.columnOrderIds]
    },
    moveCardSameColumn: (state, action) => {
      const column = state.columns.find(
        (column) => column._id === action.payload.columnId
      )
      column.cards = [...action.payload.updatedColumn.cards]
      column.cardOrderIds = [...action.payload.updatedColumn.cardOrderIds]
    },
    moveCardOtherColumn: (state, action) => {
      state.columns.find((c) => c._id === action.payload.prevColumnId).cards =
        action.payload.updatedColumns.find(
          (c) => c._id === action.payload.prevColumnId
        ).cards
      state.columns.find(
        (c) => c._id === action.payload.currentColumnId
      ).cards = action.payload.updatedColumns.find(
        (c) => c._id === action.payload.currentColumnId
      ).cards

      state.columns.find(
        (c) => c._id === action.payload.prevColumnId
      ).cardOrderIds = action.payload.updatedColumns.find(
        (c) => c._id === action.payload.prevColumnId
      ).cardOrderIds
      state.columns.find(
        (c) => c._id === action.payload.currentColumnId
      ).cardOrderIds = action.payload.updatedColumns.find(
        (c) => c._id === action.payload.currentColumnId
      ).cardOrderIds
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter((c) => c._id !== action.payload)
      state.columnOrderIds = state.columnOrderIds.filter(
        (id) => id !== action.payload
      )
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
  addNewCard,
  addNewColumn,
  moveColumn,
  moveCardSameColumn,
  moveCardOtherColumn,
  deleteColumn
} = boardSlice.actions
