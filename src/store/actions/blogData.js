import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const blogData = createAsyncThunk('blog/blogData', async (blogId, thunkAPI) => {
  try {
    const { data } = await Api.blogData(blogId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
