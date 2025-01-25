import { createReducer } from '@reduxjs/toolkit';
import { createBlog } from '../actions/createBlog';

const initialState = {
  blog: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createBlog.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createBlog.fulfilled, (state, action) => {
      state.status = 'ok';
      state.blog = action.payload.blog;
      state.error = null;
    })
    .addCase(createBlog.rejected, (state, action) => {
      state.status = 'fail';
      state.blog = null;
      state.error = action.payload;
    });
});
