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
  reducers: {}
})

export default columnSlice.reducer
// export const {} = columnSlice.actions
