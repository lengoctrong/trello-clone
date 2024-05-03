import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  filteredSearchArr: []
}

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setFilteredSearchArr: (state, action) => {
      state.filteredSearchArr = action.payload
    }
  }
})

export default searchFilterSlice.reducer
export const { setSearchValue, setFilteredSearchArr } =
  searchFilterSlice.actions
