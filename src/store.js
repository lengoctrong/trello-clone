import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './features/boards/boardSlice'
import searchFilterReducer from './features/searchFilter/searchFilterSlice'
import userReducer from './features/users/userSlice'
const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
    searchFilter: searchFilterReducer
  }
})

export default store
