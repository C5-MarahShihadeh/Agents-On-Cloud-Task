import { createSlice } from "@reduxjs/toolkit";

const favorite = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
  },
  reducers: {
    addTofavorite: (state, action) => {
      state.favorite.push(action.payload);
    },

    deleteFromfavorite: (state, action) => {
      state.favorite = state.favorite.filter((element, index) => {
        return element.id != action.payload;
      });
    },

    updatefavorite: (state, action) => {
      state.favorite = state.favorite.map((element, index) => {
        if (element.id == action.payload.id) {
          return action.payload;
        }
        return element;
      });
    },

    setfavorite: (state, action) => {
      state.favorite = action.payload;
    },
   
  },
});

export const {
  setfavorite,
  updatefavorite,
  deleteFromfavorite,
  addTofavorite,
} = favorite.actions;

export default favorite.reducer;
