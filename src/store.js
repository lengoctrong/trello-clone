import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './features/boards/boardSlice'
import userReducer from './features/users/userSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer
  }
})

export default store
