// activitySlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = [{ boardId: '', type: '', content: '', createdAt: null }]
const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.push(action.payload)
    },
    getAllActivities: (state, action) => {
      return action.payload
    }
  }
})

export const { addActivity, getAllActivities } = activitySlice.actions

export default activitySlice.reducer
