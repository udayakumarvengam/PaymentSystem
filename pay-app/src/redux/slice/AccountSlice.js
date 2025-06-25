import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchAccounts = createAsyncThunk(
  'accounts/fetch',
  async ({ page = 1, limit = 10 }) => {
    const res = await API.get(`/accounts?page=${page}&limit=${limit}`);
    return res.data;
  }
);

export const fetchTransactions = createAsyncThunk(
  'accounts/fetchTransactions',
  async (accountId) => {
    const res = await API.get(`/accounts/${accountId}/transactions`);
    return { accountId, transactions: res.data };
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    data: [],
    transactions: {},
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions[action.payload.accountId] = action.payload.transactions;
      });
  }
});

export const { setPage } = accountSlice.actions;
export default accountSlice.reducer;
