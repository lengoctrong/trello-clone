import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './features/boards/boardSlice'

const store = configureStore({
  reducer: {
    board: boardReducer
  }
})

export default store
