import { createReducer } from '@reduxjs/toolkit';
import { blogData } from '../actions/blogData';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(blogData.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(blogData.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.blog;
      state.error = null;
    })
    .addCase(blogData.rejected, (state, action) => {
      state.status = 'fail';
      state.list = [];
      state.error = action.payload;
    });
});
