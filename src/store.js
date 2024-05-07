import { configureStore } from '@reduxjs/toolkit'

import rightDrawerReducer from '~/components/RightDrawer/rightDrawerSlice'
import boardReducer from './features/boards/boardSlice'
import cardReducer from './features/cards/cardSlice'
import searchFilterReducer from './features/searchFilter/searchFilterSlice'
import userReducer from './features/users/userSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    card: cardReducer,
    user: userReducer,
    searchFilter: searchFilterReducer,
    rightDrawer: rightDrawerReducer
  }
})

export default store
