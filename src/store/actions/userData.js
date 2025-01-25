import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const userData = createAsyncThunk('user/userData', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getUserData(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
