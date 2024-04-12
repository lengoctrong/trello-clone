import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  title: '',
  description: '',
  columnOrderIds: [],
  columns: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state._id = action.payload._id
      state.title = action.payload.title
      state.description = action.payload.description
      state.columnOrderIds = action.payload.columnOrderIds
      state.columns = action.payload.columns
    },
    setBoardTitle: (state, action) => {
      state.title = action.payload
    },
    addNewCard: (state, action) => {
      const card = action.payload
      const { _id: cardId, columnId } = card
      const column = state.columns.find((column) => column._id === columnId)

      column.cardOrderIds.push(cardId)
      column.cards.push(card)
    }
  }
})

export default boardSlice.reducer
export const { setBoard, setBoardTitle, addNewCard } = boardSlice.actions
