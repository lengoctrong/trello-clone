import { createSlice } from '@reduxjs/toolkit'
import { RIGHT_DRAWER_TYPES } from '~/utils/constants'

const initialState = {
  open: false,
  type: RIGHT_DRAWER_TYPES.INFO,
  isShowSubDrawer: false
}

const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState,
  reducers: {
    openRightDrawer: (state) => {
      state.open = true
      state.isShowSubDrawer = false
    },
    closeRightDrawer: (state) => {
      state.open = false
      state.isShowSubDrawer = false
    },
    openSubRightDrawer: (state, action) => {
      state.type = action.payload
      state.open = false
      state.isShowSubDrawer = true
    },
    closeSubRightDrawer: (state, action) => {
      state.type = action.payload
      state.open = true
      state.isShowSubDrawer = false
    },
    closeAllRightDrawer: (state) => {
      state.open = false
      state.isShowSubDrawer = false
    }
  }
})

export default rightDrawerSlice.reducer
export const {
  openRightDrawer,
  closeRightDrawer,
  openSubRightDrawer,
  closeSubRightDrawer,
  closeAllRightDrawer
} = rightDrawerSlice.actions
