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
  isError: false
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    fetchBoardStart: (state) => {
      state.isPending = true
    },
    fetchBoardError: (state) => {
      state.isPending = false
      state.isError = true
    },
    fetchBoardSuccess: (state, action) => {
      return {
        ...action.payload,
        isPending: false,
        isError: false
      }
    },

    addNewColumn: (state, action) => {
      state.columns = [...state.columns, action.payload]
      state.columnOrderIds = [...state.columnOrderIds, action.payload._id]
    },

    addNewCard: (state, action) => {
      const column = state.columns.find(
        (columnn) => columnn._id === action.payload.columnId
      )
      column.cards = [...column.cards, action.payload]
      column.cardOrderIds = [...column.cardOrderIds, action.payload._id]
    },
    moveColumn: (state, action) => {}
  }
})

export default boardSlice.reducer
export const {
  fetchBoardStart,
  fetchBoardError,
  fetchBoardSuccess,
  addNewCard,
  addNewColumn,
  moveColumn
} = boardSlice.actions
