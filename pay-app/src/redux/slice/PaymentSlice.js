import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchPayments = createAsyncThunk(
  'payments/fetch',
  async ({ page = 1, limit = 10 }) => {
    const res = await API.get(`/payments?page=${page}&limit=${limit}`);
    return res.data;
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState: { data: [], total: 0, loading: false, error: null, page: 1, limit: 10 },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setPage } = paymentSlice.actions;
export default paymentSlice.reducer;
