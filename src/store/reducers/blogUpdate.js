import { createReducer } from '@reduxjs/toolkit';
import { blogUpdate } from '../actions/blogUpdate';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(blogUpdate.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(blogUpdate.fulfilled, (state, action) => {
      state.status = 'ok';
      state.data = action.payload;
      state.error = null;
    })
    .addCase(blogUpdate.rejected, (state, action) => {
      state.status = 'fail';
      state.data = [];
      state.error = action.payload;
    });
});
