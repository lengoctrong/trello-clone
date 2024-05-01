import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  title: '',
  slug: '',
  columnOrderIds: [],
  columns: [],
  createdAt: null,
  updatedAt: null,
  _destroy: false
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      return action.payload
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
export const { setBoard, addNewCard } = boardSlice.actions
