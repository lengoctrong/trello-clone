import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  card: {
    _id: '',
    title: '',
    description: '',
    boardId: '',
    columnId: '',
    createdAt: null,
    updatedAt: null,
    _destroy: false
  },
  cards: []
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardDetails: (state, action) => {
      let card = state.cards.find((c) => c._id === action.payload._id)
      if (!card) state.cards.push(action.payload)
      card = { ...card, ...action.payload }
      state.card = { ...state.card, ...action.payload }
    }
  }
})

export default cardSlice.reducer
export const { setCardDetails } = cardSlice.actions
