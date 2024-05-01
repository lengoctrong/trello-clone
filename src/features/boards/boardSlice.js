import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  title: '',
  slug: '',
  columnOrderIds: [],
  columns: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      return action.payload
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
