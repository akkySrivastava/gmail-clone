import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  mailId: null,
};


export const replySlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    setMailId: (state,action) => {
      state.mailId = action.payload
    },
  },
});

export const {setMailId } = replySlice.actions;
export const selectMailId = (state) => state.mail.mailId

export default replySlice.reducer;
