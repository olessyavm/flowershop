import { createSlice } from '@reduxjs/toolkit';

export const flowerSlice = createSlice({
    name: 'flowers',
    initialState:{
        selectedCategory:"WEDDING"
    },
    reducers:{
        filterCategory:(state, action) => {
            state.selectedCategory = action.payload;
        }
    }
})

export const getSelectedCategory = state => state.flowers.selectedCategory;
export const {filterCategory} = flowerSlice.actions;
export default flowerSlice.reducer;