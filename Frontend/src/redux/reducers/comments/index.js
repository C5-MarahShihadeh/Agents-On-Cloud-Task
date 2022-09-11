import { createSlice } from "@reduxjs/toolkit";

const comments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentName:""
  },
  reducers: {
    addcomments: (state, action) => {
      state.comments.push(action.payload);
    },

    deletecomments: (state, action) => {
      state.comments = state.comments.filter((comment, index) => {
        return comment.id != action.payload;
      });
    },

    updatecomments: (state, action) => {
      state.comments = state.comments.map((comment, index) => {
        if (comment.id == action.payload.id) {
          return action.payload;
        }
        return comment;
      });
    },

    setcomments: (state, action) => {
      state.comments = action.payload;
    },
    setcommentName: (state, action) => {
      state.commentName = action.payload;
    },
  },
});

export const { addcomments, deletecomments, updatecomments, setcomments,setcommentName } =
  comments.actions;

export default comments.reducer;
