import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { blogList } from './blogList';

export const createBlog = createAsyncThunk('blog/createBlog', async ({ userId, message }, thunkAPI) => {
  try {
    const { data } = await Api.createBlog(userId, message);
    thunkAPI.dispatch(blogList());
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
