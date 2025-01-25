import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { blogList } from './blogList';

export const blogUpdate = createAsyncThunk('blog/blogUpdate', async ({ userId, blogId, message }, thunkAPI) => {
  try {
    const { data } = await Api.blogUpdate(userId, blogId, message);
    thunkAPI.dispatch(blogList());
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
