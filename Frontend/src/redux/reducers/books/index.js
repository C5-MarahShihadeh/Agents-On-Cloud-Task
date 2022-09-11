import { createSlice } from "@reduxjs/toolkit";

const books = createSlice({
  name: "books",
  initialState: {
    books: [],
    bookName:""
  },
  reducers: {
    addbooks: (state, action) => {
      state.books.push(action.payload);
    },

    deletebooks: (state, action) => {
      state.books = state.books.filter((book, index) => {
        return book.id != action.payload;
      });
    },

    updatebooks: (state, action) => {
      state.books = state.books.map((book, index) => {
        if (book.id == action.payload.id) {
          return action.payload;
        }
        return book;
      });
    },

    setbooks: (state, action) => {
      state.books = action.payload;
    },
    setbookName: (state, action) => {
      state.bookName = action.payload;
    },
  },
});

export const { addbooks, deletebooks, updatebooks, setbooks,setbookName } =
  books.actions;

export default books.reducer;
