import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_KEYS } from '~/utils/constants'

const initialState = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEYS.USER)
) ?? {
  _id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  role: '',
  createdAt: null,
  updatedAt: null,
  _destroy: false,
  isLogin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      delete action.payload.password
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER,
        JSON.stringify({ ...state, ...action.payload })
      )
      return { ...state, ...action.payload }
    },
    logoutUser: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
      return { ...state, ...action.payload }
    }
  }
})

export default userSlice.reducer
export const { setUserDetails, logoutUser } = userSlice.actions
