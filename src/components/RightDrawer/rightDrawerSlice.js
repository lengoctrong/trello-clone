import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
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
    openSubRightDrawer: (state) => {
      state.open = false
      state.isShowSubDrawer = true
    },
    closeSubRightDrawer: (state) => {
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
