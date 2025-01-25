import { createReducer } from '@reduxjs/toolkit';
import { blogList } from '../actions/blogList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(blogList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(blogList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.blogs;
      state.error = null;
    })
    .addCase(blogList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = [];
      state.error = action.payload;
    });
});
