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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchBoard: (state, action) => {
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

export default userSlice.reducer
export const {
  fetchBoard,
  addNewCard,
  addNewColumn,
  moveColumn,
  moveCardSameColumn,
  moveCardOtherColumn,
  deleteColumn
} = userSlice.actions
