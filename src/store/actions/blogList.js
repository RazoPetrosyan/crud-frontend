import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const blogList = createAsyncThunk('blog/list', async (thunkAPI) => {
  try {
    const { data } = await Api.blogList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
