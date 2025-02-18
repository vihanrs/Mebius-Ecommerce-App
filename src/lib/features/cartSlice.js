import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.value);
      const product = action.payload;

      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.value = state.value.filter(
        (item) => item.product._id !== productId
      );
    },
    clearCart: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
