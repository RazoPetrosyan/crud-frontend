import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { blogList } from './blogList';

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (payload, thunkAPI) => {
  try {
    await Api.deleteBlog(payload);
    thunkAPI.dispatch(blogList());
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
