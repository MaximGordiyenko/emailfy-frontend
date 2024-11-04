import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get_smtp } from '../api/settings/settings';
import { getToken } from '../api/API';

export const fetchSmtpSettings = createAsyncThunk(
  'email/fetchSmtpSettings',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getToken('accessToken');
      return await get_smtp(accessToken);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    smtpSettings: null,
    status: 'idle',
    error: null,
    data: {
      campaign_name: '',
      subject: '',
      from_name: '',
      from_email: '',
      sendTo: '',
      campaign_text: '',
      html: '',
    },
  },
  reducers: {
    updateField(state, { payload }) {
      const { field, value } = payload;
      state.data[field] = value;
    },
    clearFields(state, { payload }) {
      payload.forEach((field) => {
        state.data[field] = '';
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmtpSettings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSmtpSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.smtpSettings = action.payload;
      })
      .addCase(fetchSmtpSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateField, clearFields } = campaignSlice.actions;
export default campaignSlice.reducer;
