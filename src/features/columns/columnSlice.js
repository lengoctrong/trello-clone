import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  column: {
    _id: '',
    title: '',
    boardId: '',
    cardOrderIds: [],
    cards: [],
    createdAt: null,
    updatedAt: null,
    _destroy: false
  },
  columns: [],
  isAddCardForm: false
}

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumnDetails: (state, action) => {
      let column = state.columns.find((c) => c._id === action.payload._id)
      if (!column) state.columns.push(action.payload)
      column = { ...column, ...action.payload }
      state.column = { ...state.column, ...action.payload }
    }
  }
})

export default columnSlice.reducer
export const { setColumnDetails } = columnSlice.actions
