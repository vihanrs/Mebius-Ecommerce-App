import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const savedItemSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    toggleSavedItem: (state, action) => {
      const newProduct = action.payload;
      const foundItemIndex = state.value.findIndex(
        (item) => item.product._id === newProduct._id
      );

      if (foundItemIndex !== -1) {
        // If item is found, remove it from the saved list
        state.value.splice(foundItemIndex, 1);
      } else {
        // Otherwise, add it to the saved list
        state.value.push({ product: newProduct });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSavedItem } = savedItemSlice.actions;

export default savedItemSlice.reducer;
